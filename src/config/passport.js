const passport = require('passport');
require('./strategies/local.strategy')();
// const debug = require('debug')('app:passport');
// const {
//   MongoClient
// } = require('mongodb');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Store user in session
  passport.serializeUser((user, done) => {
    // done(null, user._id);
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';

    // (async function mongo() {
    //   let client;
    //   try {
    //     client = await MongoClient.connect(url);
    //     debug('Connected correctly to server');

    //     const db = client.db(dbName);
    //     const col = db.collection('users');

    //     const user = await col.findOne({
    //       userId
    //     });
    //     done(null, user);
    //   } catch (error) {
    //     debug(error.stack);
    //   }
    //   client.close();
    // }());
    done(null, user);
  });
};
