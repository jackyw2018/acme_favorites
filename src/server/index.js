const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const { Thing, User, Favorite } = require('./db/index').models;

const path = require('path');
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

app.get('/api/users', (req, res, next) => {
  User.findAll({ include: Thing })
    .then(data => res.send(data))
    .catch(next);
});

app.get('/api/things', (req, res, next) => {
  Thing.findAll({ include: User })
    .then(data => res.send(data))
    .catch(next);
});

const port = process.env.PORT || 3000;

const { syncAndSeed } = require('./db/index');

const init = () => {
  syncAndSeed()
    .then(() => {
      app.listen(port, () => console.log(`listening on port ${port}`));
    })
    .catch(error => console.log(error));
};

init();
