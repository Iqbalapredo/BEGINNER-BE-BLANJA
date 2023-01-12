const express = require('express');
const { search, list, detail, insert, destroy, update } = require('../controller/transaksi.controller');
const router = express.Router();

router.get('/transaction', search).get('/trans/', list).get('/transaction/:id', detail).post('/transaction/', insert).put('/transaction/:id', update).delete('/transaction/:id', destroy);

module.exports = router;
