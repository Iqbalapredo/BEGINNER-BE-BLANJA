/* eslint-disable camelcase */
const db = require('../config/db');

const categoryModel = {
  // router list
  selectAll: (limit, offset, sortby, sort) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  searchCategory: (search) => {
    return db.query(`SELECT * FROM category WHERE category ILIKE '%${search}%'`);
  },
  // lihat data by id
  selectDetail: (id_category) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM category WHERE id_category=${id_category}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // update
  updateCategory: (id_category, category) =>
    new Promise((resolve, reject) => {
      db.query(`UPDATE category SET category = '${category}' WHERE id_category = ${id_category}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),

  // router insert
  store: (id_category, category) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO category (id_category, category) VALUES (${id_category}, '${category}')`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // delete by id
  destroy: (id_category) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM category WHERE id_category=${id_category}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = categoryModel;
