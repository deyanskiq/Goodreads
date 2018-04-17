const passport = require('passport');
const {
  Strategy
} = require('passport-local');
const debug = require('debug')('app:local.strategy');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const User = require('../../models/User');
const mongoose = require('mongoose');

module.exports = function localStrategy() {
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signin', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';

    (async function mongo() {
      try {
        mongoose.connect('mongodb://localhost/libraryApp');
        debug('Connected to the server');
        const user = await User.findOne({
          username
        });
        if (user) {
          bcrypt.compare(password, user.hash, (err, res) => {
            if (res === true) {
              done(null, user);
            } else {
              done(null, false, req.flash('loginMessage', 'Wrong username or password'));
            }
          });
        } else {
          done(null, false, req.flash('loginMessage', 'Wrong username or password'));
        }
      } catch (error) {
        debug(error.stack);
      }
    }());

    // (async function mongo() {
    //   let client;
    //   try {
    //     client = await MongoClient.connect(url);
    //     debug('Connected correctly to server');

    //     const db = client.db(dbName);
    //     const col = db.collection('users');

    //     const user = await col.findOne({
    //       username
    //     });
    //     if (user) {
    //       bcrypt.compare(password, user.hash, (err, res) => {
    //         if (res === true) {
    //           done(null, user);
    //         } else {
    //           done(null, false, req.flash('loginMessage', 'Wrong username or password'));
    //         }
    //       });
    //     } else {
    //       done(null, false, req.flash('loginMessage', 'Wrong username or password'));
    //     }
    //   } catch (error) {
    //     debug(error.stack);
    //   }
    //   client.close();
    // }());
  }));
  passport.use('local-signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';

    bcrypt.hash(password, saltRounds, (err, hash) => {
      (async function mongo() {
        try {
          mongoose.connect('mongodb://localhost/libraryApp');
          debug('Connected to the server');
          let user = await User.findOne({
            username
          });
          if (user) {
            done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          } else {
            user = {
              username,
              readBooks: [],
              hash,
              role: 'user'
            };
          }
          const results = await User.create(user);
          debug(results);
          done(null, results);
        } catch (error) {
          debug(error);
        }
      }());
      // (async function mongo() {
      //   let client;
      //   try {
      //     client = await MongoClient.connect(url);
      //     debug('Connected correctly to server');

      //     const db = client.db(dbName);

      //     const col = db.collection('users');
      //     let user = await col.findOne({
      //       username
      //     });

      //     if (user) {
      //       done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      //     } else {
      //       user = {
      //         username,
      //         hash,
      //         role: 'user'
      //       };
      //     }
      //     const results = await col.insertOne(user);
      //     done(null, results.ops[0]);
      //   } catch (error) {
      //     debug(error);
      //   }
      // }());
    });
  }));
};