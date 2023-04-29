const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false
    },    
    password:{
      type: String,
      required: [true,'請輸入密碼'],
      minlength: 8,
      select: false
    },
    photo: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    }
  });
const User = mongoose.model('user', userSchema);

module.exports = User;
