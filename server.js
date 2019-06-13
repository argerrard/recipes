const express = require('express');
const app = express();
const psqlConfig = require('./config/psql.config');


const { Pool } = require('pg')

const pool = new Pool(psqlConfig);

const port = process.env.PORT || 5000;

pool.query('SELECT * FROM test2 WHERE name = $1', [1], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
  });


app.use(express.json());


app.listen(port, () => console.log(`Server started on port ${port}.`));