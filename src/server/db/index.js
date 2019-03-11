const db = require('./conn');
const Thing = require('./Thing');
const User = require('./User');
const Favorite = require('./Favorite');

User.belongsToMany(Thing, { through: Favorite });
Thing.belongsToMany(User, { through: Favorite });
// Favorite.belongsTo(User);
// Favorite.belongsTo(Thing);

const usernames = ['moe', 'larry', 'curly', 'shep'];
const things = ['foo', 'bar', 'bazz', 'quq', 'quip'];
const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        Promise.all(usernames.map(name => User.create({ name }))).then(items =>
          items.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          }, {})
        ),
        Promise.all(things.map(name => Thing.create({ name }))).then(items =>
          items.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          }, {})
        ),
      ]);
    })
    .then(([userMap, thingMap]) => {
      return Promise.all([
        Favorite.create({
          userId: userMap.moe.id,
          thingId: thingMap.foo.id,
          rank: 7,
        }),
        Favorite.create({
          userId: userMap.moe.id,
          thingId: thingMap.bar.id,
          rank: 5,
        }),
        Favorite.create({
          userId: userMap.moe.id,
          thingId: thingMap.bazz.id,
          rank: 1,
        }),
        Favorite.create(
          { userId: userMap.larry.id, thingId: thingMap.bazz.id, rank: 2 },
          Favorite.create({
            userId: userMap.larry.id,
            thingId: thingMap.bar.id,
            rank: 1,
          })
        ),
      ]);
    });
};

module.exports = {
  models: {
    Thing,
    User,
    Favorite,
  },
  syncAndSeed,
};
