/* eslint-disable camelcase */
const db = require('../config/db');

const productModel = {
  // router list
  selectAll: (limit, offset, sortby, sort) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  // get product
  searchProduct: (search) => {
    return db.query(`SELECT * FROM product WHERE product_name ILIKE '%${search}%'`);
  },

  // lihat data by id
  selectDetail: (id_product) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM product WHERE id_product=${id_product}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  // lihat data by product name
  selectDetailName: (product_name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT * FROM product WHERE lower(product_name) LIKE lower ('%${product_name}%')`
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // update
  updateProduct: (id_product, product_name, price, stock, condition, color, size, category, description) => {
    return new Promise((resolve, reject) => {
      db.query(
        `   UPDATE product SET
            product_name = COALESCE($1, product_name),
            price = COALESCE($2, price),
            stock = COALESCE($3, stock),
            condition = COALESCE($4, condition),
            color = COALESCE($5, color),
            size = COALESCE($6, size),
            category = COALESCE($7, category),
            description = COALESCE($8, description)
            WHERE id_product = $9
            `,
        [product_name, price, stock, condition, color, size, category, description, id_product],
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
  store: (id_product, product_name, price, stock, condition, color, size, category, description) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO product (id_product, product_name, price, stock, condition, color, size, category, description) VALUES (${id_product}, '${product_name}', '${price}', '${stock}', '${condition}', '${color}', '${size}', '${category}', '${description}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  // delete by id
  destroy: (id_product) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM product WHERE id_product=${id_product}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = productModel;
