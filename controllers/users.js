const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');

const user = {
  async getAllUsers(req, res) {
    const allUsers = await User.find();
    handleSuccess(res, allUsers);
  },
  register: handleErrorAsync(async(req, res, next) => {
      const { name, email, password } = req.body;
      if(!name || !email || !password) {
        return next(appError('400', '欄位填寫錯誤', next))
      };
      const hasEmail = await User.findOne({ email })
      if (hasEmail) {
        return next(appError('400', 'E-mail 已被註冊', next))
      };
      const createUser = await User.create({
        name: name,
        email: email,
        password: password
      });
      handleSuccess(res, createUser);
  })
};

module.exports = user;