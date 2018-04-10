const express = require('express');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

const Sequelize = require('sequelize');


const sequelize = new Sequelize('goodreads_development', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

const Book = require('../../models/book')(sequelize, Sequelize);

function router(nav) {
  bookRouter.route('/').get((req, res) => {
    (async function query() {
      sequelize
        .authenticate()
        .then(() => {
          debug('Connection has been established successfully.');
        });
      const bookAll = await Book.findAll();
      res.render('bookListView', {
        nav,
        title: 'Library',
        books: bookAll
      });
    }());
  });

  bookRouter.route('/:id')
    // middleware
    .all((req, res, next) => {
      (async function query() {
        // const id = req.params.id
        const {
          id
        } = req.params;
        const oneBook = await Book.findById(id);
        req.book = oneBook;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        title: 'Library',
        book: req.book,
        nav
      });
    });

  return bookRouter;
}
module.exports = router;
