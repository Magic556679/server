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
    ref: 'user',
    required: [true, 'user 未填寫'],
  },
  likes: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }
},
{
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

postsSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

const posts = mongoose.model(
  'posts',
  postsSchema
);
module.exports = posts;
