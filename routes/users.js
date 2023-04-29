var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');
const { isAuth } = require('../service/auth');

router.get('/', UsersControllers.getAllUsers);
router.get('/profile', UsersControllers.profile);
router.patch('/profile',  isAuth, UsersControllers.updateProfile);
router.patch('/updatePassword',  isAuth, UsersControllers.updatePassword);
router.post('/register', UsersControllers.register);
router.post('/login', UsersControllers.logIn);

module.exports = router;
