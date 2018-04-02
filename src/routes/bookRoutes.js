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
  const books = [{
    title: 'Intercom starting up',
    author: 'Intercom'
  },
  {
    title: 'How to win friends and influence people',
    author: 'Dale Carnegie'
  },
  {
    title: 'Conversations with Atanas Burov',
    author: 'Mihail Pamukchiev'
  },

  ];

  bookRouter.route('/').get((req, res) => {
    (async function query() {
      sequelize
        .authenticate()
        .then(() => {
          debug('Connection has been established successfully.');
        });
      const bookAll = await Book.findAll();
      debug(bookAll.books);
      res.render('bookListView', {
        nav,
        title: 'Library',
        books: bookAll
      });
    }());
  });

  bookRouter.route('/:id').get((req, res) => {
    // const id = req.params.id
    const {
      id
    } = req.params;

    res.render('bookView', {
      title: 'Library',
      book: books[id],
      nav
    });
  });

  bookRouter.route('/:id').get((req, res) => {
    // const id = req.params.id
    const {
      id
    } = req.params;

    res.render('bookView', {
      title: 'Library',
      book: books[id],
      nav
    });
  });

  return bookRouter;
}
module.exports = router;
