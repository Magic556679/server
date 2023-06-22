const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
  image: {
    type: String,
    default: ""
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'user 未填寫'],
  },
  likes: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  comments:{
    type: Number,
    default: 0
  },
});
const posts = mongoose.model(
  'posts',
  postsSchema
);
module.exports = posts;
