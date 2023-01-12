/* eslint-disable camelcase */
const transactionsModel = require('../model/transaksi.model');
const createError = require('http-errors');

const transactionsController = {
  list: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || name;
    const sort = req.query.sort.toUpperCase() || 'ASC';
    transactionsModel
      .selectAll(limit, offset, sortby, sort)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  // get product
  search: async (req, res, next) => {
    try {
      const search = req.query.search || '';

      const { rows: transactions } = await transactionsModel.searchTransaksi(search);

      res.json({
        msg: 'search transactions success',
        transactions,
      });
    } catch (err) {
      console.log(err);
      next(createError(500, 'search transactions failed'));
    }
  },
  detail: (req, res) => {
    const id_transactions = req.params.id;
    transactionsModel
      .selectDetail(id_transactions)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json('data not found');
      });
  },
  insert: (req, res) => {
    const { id_transactions, payment_type, payment_status, transactions_status } = req.body;
    transactionsModel
      .store(id_transactions, payment_type, payment_status, transactions_status)
      .then((result) => {
        res.json('success insert product');
      })
      .catch((err) => {
        res.json(err);
      });
  },
  update: (req, res) => {
    const { payment_type, payment_status, transactions_status } = req.body;
    const id_transactions = req.params.id;
    transactionsModel
      .updateTransactions(id_transactions, payment_type, payment_status, transactions_status)
      .then((result) => {
        res.json('update success');
      })
      .catch((err) => {
        res.json(err);
      });
  },
  destroy: (req, res) => {
    const id_transactions = req.params.id;
    transactionsModel
      .destroy(id_transactions)
      .then((result) => {
        res.json('Success Delete');
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = transactionsController;
