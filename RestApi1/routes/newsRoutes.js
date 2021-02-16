const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.param("id",newsController.checkArticle);


router.get('/news', newsController.checkParams, newsController.getNews);
router.get('/news/first',newsController.getFirst);
router.get('/news/last',newsController.getLast);
router.get('/news/count',newsController.getNumber)
router.get('/news/:id', newsController.getArticle);

router.post('/news',newsController.checkData, newsController.postNews);
router.put('/news/:id',newsController.checkData,newsController.updateNews);
router.delete('/news/:id',newsController.deleteNews)

module.exports = router;
