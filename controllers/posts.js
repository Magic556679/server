const Posts = require('../models/postsModel');
const User = require('../models/usersModel');
const Comment = require('../models/commentsModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');

const posts = {
  async getPosts(req, res, next) {
    try {
      const search = req.query.search !== undefined ? {"content": new RegExp(req.query.search)} : {};

      const allPosts = await Posts.find(search).populate({
        path: 'user',
        select: 'name photo'
      }).populate({
        path: 'comments',
        select: 'comment user createdAt'
      }).select('image content user likes createAt');

      handleSuccess(res, allPosts);
    } catch (error) {
      console.log(error)
      appError(500,'程式錯誤', next);
    }
  },
  async getPost(req, res, next) {
    try {
      const postId = req.params.postId;
      if (!postId) {
        appError(404, '請提供id', next);
      }
      const userPosts = await Posts.findById(postId);
      handleSuccess(res, userPosts);
    } catch (error) {
      console.log(error)
      appError(500,'程式錯誤', next);
    }
  },
  async getUserPosts(req, res, next) {
    try {
      const postId = req.params.postId;
      if (!postId) {
        appError(404, '請提供id', next);
      }
      const userPosts = await Posts.find({ user: postId });
      handleSuccess(res, userPosts);
    } catch (error) {
      console.log(error)
      appError(500,'程式錯誤', next);
    }
  },
  async createdPosts(req, res, next) {
    try {
      const { content, image, user } = req.body
      if (!content) {
        return next(appError(404, '請填寫評論', next))
      }

      const searchId = await User.findById(user).exec().catch(() => {
        return next(appError(404, 'user not found', next))
      })

      const newPosts = await Posts.create({
        content: content,
        image: image,
        user: searchId
      });
      handleSuccess(res, newPosts);
    } catch (error) {
      console.log(error.errors);
      appError(500,'程式錯誤', next);
    }
  },
  async addComment(req, res, next) {
    try {
      const postId = req.params.postId;
      const { comment, user } = req.body;
      const newComment = await Comment.create({
        comment: comment,
        user: user,
        post: postId
      });

      handleSuccess(res, newComment);
    } catch (error) {
      console.log(error.errors);
      appError(500,'程式錯誤', next);
    }
  },
  async deleteAllPosts(req, res) {
    await Posts.deleteMany({})
		const allPosts = await Posts.find();
		handleSuccess(res, allPosts);
  },
  async addLike(req, res, next) {
    try {
      const postId = req.params.postId;
      if (!postId) {
        appError(404, '無文章id資訊', next);
      }
      const postLike =  await Posts.findOneAndUpdate(
        { _id: postId},
        { $addToSet: { likes: req.user.id } },
        { new: true }
      );
      if (!postLike) {
        return next(appError(404, '無此欄位', next))
      }
      handleSuccess(res, postLike);
    } catch (error) {
      console.log(error)
      appError(500,'程式錯誤', next);
    }
  },
  async unLike(req, res, next) {
    try {
      const postId = req.params.postId;
      if (!postId) {
        appError(404, '無文章id資訊', next);
      }
      const postLike =  await Posts.findOneAndUpdate(
        { _id: postId},
        { $pull: { likes: req.user.id } },
        { new: true }
      );
      if (!postLike) {
        return next(appError(404, '無此欄位', next))
      }
      handleSuccess(res, postLike);
    } catch (error) {
      console.log(error)
      appError(500,'程式錯誤', next);
    }
  }
};

module.exports = posts;