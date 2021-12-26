const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const { route } = require('./courses');

// newsController.index
router.use('/mp3', siteController.mp3);
router.use('/courses', siteController.index);
router.use('/search', siteController.search);
router.use('/', siteController.home);

module.exports = router;
