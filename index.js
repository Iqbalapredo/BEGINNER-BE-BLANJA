require('dotenv').config();
// DEKLARE LIBRARY
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

// BUAT ROUTE
const productRouter = require('./src/router/product.routes');
const categoryRouter = require('./src/router/category.routes');
const transactionsRouter = require('./src/router/transaksi.routes');

const app = express();
try {
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(xss());
  app.use(cors());
  app.use(productRouter);
  app.use(categoryRouter);
  app.use(transactionsRouter);
} catch (error) {
  console.log(error);
}

app.all('*', (req, res, next) => {
  next(
    res.json({
      message: 'Page not found',
    })
  );
});

// jalankan express
app.listen(process.env.PORT, () => {
  console.log('SERVICE RUNNING ON PORT 3001');
});
