const express = require('express');
const app = express();

const users = require('./routes/api/users');
const ingredients = require('./routes/api/ingredients');

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', users);
app.use('/api/ingredients', ingredients);

app.listen(port, () => console.log(`Server started on port ${port}.`));