const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');

const user = {
  async getAllUsers(req, res) {
    const allUsers = await User.find();
    handleSuccess(res, allUsers);
  },
  async register(req, res, next) {
    try {
      const { name, email } = req.body;
      if(!name || !email) {
        return appError('400', '欄位填寫錯誤', next)
      };
      const createUser = await User.create({
        name: name,
        email: email
      });
      handleSuccess(res, createUser);
    } catch (error) {
      appError(500, 'register error', next);
    }
  }
};

module.exports = user;