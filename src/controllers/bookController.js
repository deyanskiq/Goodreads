const debug = require('debug')('app:bookController');
const mongoose = require('mongoose');
const Book = require('../models/Book');

function bookController(bookService, nav) {
  // do not save 'owner' object at the database. We have access to it only on call time
  // const promise = Book.find({}).populate('owner').exec();
  // promise.then(function test(books) {
  //   debug(books);
  // }, function test1(err) {
  //   debug(err.stack);
  // });
  function getIndex(req, res) {
    (async function mongo() {
      try {
        mongoose.connect('mongodb://localhost/libraryApp');
        debug('Connected to the server');

        const books = await Book.find();
        res.render('bookListView', {
          title: 'Library',
          books,
          nav
        });
      } catch (error) {
        debug(error.stack);
      }
    }());

    // WITHOUT mongoose
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';
    // (async function mongo() {
    //   let client;
    //   try {
    //     client = await MongoClient.connect(url);
    //     debug('Connected to the server');

    //     const db = client.db(dbName);

    //     const col = await db.collection('books');

    //     const books = await col.find().toArray();
    //     // for (let i; i < books.length; i += 1) {
    //     //   books[i].details = await bookService.getBookById(books[i].bookId);
    //     // }
    //     // Promise.all(books.map(async (book) => {
    //     //   book.details = await bookService.getBookById(book.bookId);
    //     //   return book;
    //     // }));
    //     debug(books);
    //     res.render('bookListView', {
    //       title: 'Library',
    //       books,
    //       nav
    //     });
    //   } catch (error) {
    //     debug(error.stack);
    //   }
    //   client.close();
    // }());
  }

  function getById(req, res) {
    const {
      id
    } = req.params;
    try {
      (async function mongo() {
        mongoose.connect('mongodb://localhost/libraryApp');
        debug('Connected to the server');
        const book = await Book.findById(id);
        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView', {
          title: 'Library',
          book,
          nav
        });
      }());
    } catch (error) {
      debug(error.stack);
    }
    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';

    // (async function mongo() {
    //   let client;
    //   try {
    //     client = await MongoClient.connect(url);
    //     debug('Connected to the server');
    //     const db = client.db(dbName);
    //     const col = await db.collection('books');

    //     const book = await col.findOne({
    //       _id: new ObjectID(id)
    //     });
    //     book.details = await bookService.getBookById(book.bookId);
    //     res.render('bookView', {
    //       title: 'Library',
    //       book,
    //       nav
    //     });
    //   } catch (error) {
    //     debug(error.stack);
    //   }
    //   client.close();
    // }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}
module.exports = bookController;