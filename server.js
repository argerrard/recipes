const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const port = process.env.PORT || 5000;


app.use(express.json());

let db = new sqlite3.Database('db/database.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	//Required to enforce DELETE CASCADE integrity
	db.run('PRAGMA foreign_keys=on');
	console.log('Connected to the database.');
});

app.listen(port, () => console.log(`Server started on port ${port}.`));

// close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
