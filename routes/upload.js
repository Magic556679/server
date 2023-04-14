var express = require('express');
var router = express.Router();
const { isAuth } = require('../service/auth');
const { upload } = require('../service/upload');
const  uploadController = require('../controllers/upload');

// isAuth
router.post('/', isAuth, upload, uploadController.uploadImage);

module.exports = router;