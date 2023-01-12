/* eslint-disable camelcase */
const db = require('../config/db');

const transactionsModel = {
  // router list
  selectAll: (limit, offset, sortby, sort) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM transactions ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  searchTransaksi: (search) => {
    return db.query(`SELECT * FROM transactions WHERE payment_type ILIKE '%${search}%'`);
  },
  // lihat data by id
  selectDetail: (id_transactions) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM transactions WHERE id_transactions=${id_transactions}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // update
  updateTransactions: (id_transactions, payment_type, payment_status, transactions_status) => {
    return new Promise((resolve, reject) => {
      db.query(
        `   UPDATE transactions SET
        payment_type = COALESCE($1, payment_type),
        payment_status = COALESCE($2, payment_status),
        transactions_status = COALESCE($3, transactions_status)
          
            WHERE id_transactions = $4
            `,
        [payment_type, payment_status, transactions_status, id_transactions],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  // router insert
  store: (id_transactions, payment_type, payment_status, transactions_status) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO transactions (id_transactions, payment_type, payment_status, transactions_status) VALUES (${id_transactions}, '${payment_type}', '${payment_status}', '${transactions_status}')`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // delete by id
  destroy: (id_transactions) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM transactions WHERE id_transactions=${id_transactions}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = transactionsModel;
