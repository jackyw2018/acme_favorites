const Sequlize = require('sequelize');
const db = require('./conn.js');

const Thing = db.define('thing', {
  name: Sequlize.STRING,
});

module.exports = Thing;
