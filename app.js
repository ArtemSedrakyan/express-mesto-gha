const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '633858febd539eb4fd0a0f11'
  };

  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});