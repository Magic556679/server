var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getAllUsers);
router.get('/profile', UsersControllers.profile);
router.patch('/profile', UsersControllers.updateProfile);
router.post('/register', UsersControllers.register);
router.post('/login', UsersControllers.logIn);

module.exports = router;
