
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');

const generateSendJWT= (user,res)=>{
  // 產生 JWT token
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
  generateSendJWT
};