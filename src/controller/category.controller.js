/* eslint-disable camelcase */
const categoryModel = require('../model/category.model');
const createError = require('http-errors');

const categoryController = {
  list: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const sortby = req.query.sortby || name;
    const sort = req.query.sort.toUpperCase() || 'ASC';
    categoryModel
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

      const { rows: category } = await categoryModel.searchCategory(search);

      res.json({
        msg: 'search category success',
        category,
      });
    } catch (err) {
      console.log(err);
      next(createError(500, 'search category failed'));
    }
  },
  detail: (req, res) => {
    const id_category = req.params.id;
    categoryModel
      .selectDetail(id_category)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  insert: (req, res) => {
    const { id_category, category } = req.body;
    categoryModel
      .store(id_category, category)
      .then((result) => {
        res.json('insert category success');
      })
      .catch((err) => {
        res.json(err);
      });
  },
  update: (req, res) => {
    const { category } = req.body;
    const id_category = req.params.id;
    categoryModel
      .updateCategory(id_category, category)
      .then((result) => {
        res.json('success update');
      })
      .catch((err) => {
        res.json(err);
      });
  },

  destroy: (req, res) => {
    const id_category = req.params.id;
    // console.log(id_product);
    categoryModel
      .destroy(id_category)
      .then((result) => {
        res.json('Success Delete');
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = categoryController;
