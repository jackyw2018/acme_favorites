const Sequlize = require('sequelize');
const db = require('./conn');

const Favorite = db.define('favorite', {
  rank: Sequlize.INTEGER,
});

module.exports = Favorite;
