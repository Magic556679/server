var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../service/auth');

router.get('/', PostsControllers.getPosts);
router.post('/', isAuth, PostsControllers.createdPosts);
router.delete('/', PostsControllers.deleteAllPosts);

module.exports = router;
