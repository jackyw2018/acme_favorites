const Sequelize = require('sequelize');
const db = require('./conn');

const User = db.define('users', {
  name: Sequelize.STRING,
});

module.exports = User;
