
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');

const isAuth = handleErrorAsync(async(req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  };
  if (!token) {
    return appError('401', '尚未登入', next);
  };
  const decoded = await new Promise((resolve,reject)=>{
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
      if (err) {
        reject(err)
      } else {
        resolve(payload)
      }
    })
  }).catch((err) => {
    return appError('401', 'invalid token', next)
  });
  const currentUser = await User.findById(decoded.id);
  req.currentUser;
  next();
});

const generateSendJWT= (user,res)=>{
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_DAY
  });
  const newUser = {
    id: user._id,
    name: user.name,
    token
  }
  handleSuccess(res, newUser);
};

module.exports = {
  generateSendJWT,
  isAuth
};