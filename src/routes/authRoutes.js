const express = require('express');
const passport = require('passport');
const {
  MongoClient
} = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signup')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password, role: 'user' };
          const results = await col.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error);
        }
      }());
    })
    .get((req, res) => {
      res.render('signup', {
        nav,
        title: 'Sign up'
      });
    });
  authRouter.route('/signin')
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user && req.user.role === 'user') {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.render('profile', {
        nav,
        title: 'Profile',
        user: req.user
      });
    });
  return authRouter;
}

module.exports = router;
