const express = require('express');
const app = express();

const users = require('./routes/api/users');
const ingredients = require('./routes/api/ingredients');
const auth = require('./routes/api/auth');

const port = process.env.PORT || 5000;

app.use(express.json());

//Set up API routes
app.use('/api/users', users);
app.use('/api/ingredients', ingredients);
app.use('/api/auth', auth);

//Start up server
app.listen(port, () => console.log(`Server started on port ${port}.`));