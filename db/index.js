const { Pool } = require('pg')
const dbconfig = require('./db.config');

const pool = new Pool(dbconfig);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}