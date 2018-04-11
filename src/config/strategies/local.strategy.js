const passport = require('passport');
const {
  Strategy
} = require('passport-local');
const debug = require('debug')('app:local.strategy');
const {
  MongoClient
} = require('mongodb');


module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);
        const col = db.collection('users');

        const user = await col.findOne({
          username
        });
        if (user != null && user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }));
};
