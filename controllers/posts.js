const Posts = require('../models/postsModel');
const appError = require("../service/appError");


const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    res.send({
      status: true,
      message: allPosts
    });
    res.end();
		// handleSuccess(res, allPosts);
  },
};

module.exports = posts;