const express = require('express');
const { search, list, detail, insert, update, destroy, detailName } = require('../controller/product.controller');
const router = express.Router();

router.get('/product', search).get('/productt/', list).get('/product/:id', detail).post('/product/:name', detailName).post('/product/', insert).put('/product/:id', update).delete('/product/:id', destroy);

module.exports = router;
