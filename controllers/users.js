const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/usersModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');
const { generateSendJWT } = require('../service/auth');

const user = {
  async getAllUsers(req, res) {
    const allUsers = await User.find();
    handleSuccess(res, allUsers);
  },
  profile: handleErrorAsync(async(req, res, next) => {
    const id = req.query.id;
    let profile = null;
    if (!id){
      next(appError('400', '查無此用戶', next));
    };
    // 驗證 id 是否符合 mongoes ObjectId 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(appError('400', '查無此用戶', next));
    };
    profile = await User.findById(id);
    if (!profile) {
      next(appError('400', '查無此用戶', next));
    };
    handleSuccess(res, profile);
  }),
  updateProfile: handleErrorAsync(async(req, res, next) => {
    const id = req.user._id;
    const { gender, name,  photo} = req.body;
    if (!name) {
      return  next(appError('400', '姓名不得為空', next))
    };
    if(!gender){
      return  next(appError('400', '性別不得為空', next))
    };
    const profile = await User.findOneAndUpdate(id, { gender, name, photo}, {new: true});
    handleSuccess(res, profile);
  }),
  updatePassword: handleErrorAsync(async(req, res, next) => {
    const id = req.user._id
    const { password, confirmPassword } = req.body;
    if (!password) {
      return next(appError('400', '請輸入密碼', next))
    };
    if (!confirmPassword) {
      return next(appError('400', '請輸入確認密碼', next))
    };
    if (password !== confirmPassword) {
      return next(appError('400', '密碼與確認密碼不一致', next))
    };
    const hashPassword = await bcrypt.hash(password,12)
    const user = await User.findOneAndUpdate(id, { password: hashPassword }, {new: true});
    generateSendJWT(user, res);
  }),
  register: handleErrorAsync(async(req, res, next) => {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return next(appError('400', '欄位填寫錯誤', next))
      };
      const hasEmail = await User.findOne({ email })
      if (hasEmail) {
        return next(appError('400', 'E-mail 已被註冊', next))
      };
      const hashPassword = await bcrypt.hash(password,12)
      const createUser = await User.create({
        name: name,
        email: email,
        password: hashPassword
      });
      generateSendJWT(createUser, res);
  }),
  logIn: handleErrorAsync(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email, !password) {
      return next(appError('400', '欄位不得為空', next));
    };
    const user = await User.findOne({email}).select('+password');
    if (!user) {
      return next(appError('400', '帳號或密碼輸入錯誤', next));
    };
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(appError('400', '帳號或密碼輸入錯誤', next))
    };
    generateSendJWT(user, res);
  })
};

module.exports = user;