var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../service/auth');

router.get('/', PostsControllers.getPosts);
router.post('/:postId', PostsControllers.getPost);
router.post('/:postId/list', PostsControllers.getUserPosts);
router.post('/', isAuth, PostsControllers.createdPosts);
router.post('/:postId/comment', isAuth, PostsControllers.addComment);
router.delete('/', PostsControllers.deleteAllPosts);
router.post('/:postId/like', isAuth, PostsControllers.addLike);
router.delete('/:postId/like', isAuth, PostsControllers.unLike);

module.exports = router;
