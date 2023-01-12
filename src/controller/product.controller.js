/* eslint-disable camelcase */
const productModel = require('../model/product.model');
const createError = require('http-errors');

const productController = {
  list: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || name;
    const sort = req.query.sort.toUpperCase() || 'ASC';
    productModel
      .selectAll(limit, offset, sortby, sort)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // search product
  search: async (req, res, next) => {
    try {
      const search = req.query.search || '';

      const { rows: products } = await productModel.searchProduct(search);

      res.json({
        msg: 'search products success',
        products,
      });
    } catch (err) {
      console.log(err);
      next(createError(500, 'search products failed'));
    }
  },

  detail: (req, res) => {
    const id_product = req.params.id;
    productModel
      .selectDetail(id_product)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  detailName: (req, res) => {
    const product_name = req.params.product_name;
    productModel
      .selectDetailName(product_name)
      .then((result) => {
        success(res, result.rows, 'success', 'success get data');
      })
      .catch((err) => {
        failed(res, err, 'failed', 'failed get data');
      });
  },

  insert: (req, res) => {
    const { id_product, product_name, price, stock, condition, color, size, category, description } = req.body;
    productModel
      .store(id_product, product_name, price, stock, condition, color, size, category, description)
      .then((result) => {
        res.json('success insert product');
      })
      .catch((err) => {
        res.json(err);
      });
  },

  update: (req, res) => {
    const { product_name, price, stock, condition, color, size, category, description } = req.body;
    const id_product = req.params.id;
    productModel
      .updateProduct(id_product, product_name, price, stock, condition, color, size, category, description)
      .then((result) => {
        res.json('data Update');
      })
      .catch((err) => {
        res.json(err);
      });
  },

  destroy: (req, res) => {
    const id_product = req.params.id;
    // console.log(id_product);
    productModel
      .destroy(id_product)
      .then((result) => {
        res.json('Success Delete');
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = productController;
