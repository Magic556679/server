const Posts = require('../models/postsModel');
const User = require('../models/usersModel');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');


const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
  },
  async createdPosts(req, res, next) {
    try {
      const { content, image, user } = req.body
      if (!content) {
        return next(appError(404, '請填寫評論', next))
      }
    } catch (error) {
      console.log(error.errors);
      appError(500,'程式錯誤', next);
    }
  },
  async deleteAllPosts(req, res){
    await Posts.deleteMany({})
		const allPosts = await Posts.find();
		handleSuccess(res, allPosts);
  },
};

module.exports = posts;