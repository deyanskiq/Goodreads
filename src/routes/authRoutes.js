const express = require('express');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signup')
    .post(passport.authenticate('local-signup', {
      successRedirect: '/auth/profile',
      failureRedirect: '/auth/signup',
      failureFlash: true
    }))
    .get((req, res) => {
      res.render('signup', {
        nav,
        title: 'Sign up'
      });
    });
  authRouter.route('/signin')
    .post(passport.authenticate('local-signin', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
      failureFlash: true
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