const express = require('express');
const { search, list, detail, insert, destroy, update } = require('../controller/category.controller');
const router = express.Router();

router.get('/category', search).get('/categoryy/', list).get('/category/:id', detail).post('/category/', insert).put('/category/:id', update).delete('/category/:id', destroy);

module.exports = router;
