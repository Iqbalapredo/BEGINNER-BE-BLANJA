// deklare library
const pg = require('pg')

const db = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

// cek koneksi
db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('connected database')
  }
})

module.exports = db
