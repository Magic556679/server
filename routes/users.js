var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getAllUsers);
router.post('/register', UsersControllers.register);

module.exports = router;
