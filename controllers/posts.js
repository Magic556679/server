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
      const { name ,content, tags, type } = req.body
      // user Collections id
      // const id = '639443265053385cd7738da3';
      // const searchId = await User.findById(id).exec()

      if (name && content && tags && type) {
        const newPosts = await Posts.create({
          name: name,
          content: content,
          tags: tags,
          type: type
        });
        handleSuccess(res, newPosts);
        return
      }
      appError(404, '檢查欄位是否都有填寫', next);
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