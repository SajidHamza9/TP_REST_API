const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.get('/news', newsController.getNews);

router.post('/news', newsController.postNews);

module.exports = router;
