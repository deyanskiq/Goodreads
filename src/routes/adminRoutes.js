const express = require('express');
const {
  MongoClient
} = require('mongodb');

const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

const books = [{
  title: 'War and Peace',
  author: 'Lev Tolstoy',
  bookId: 656
},
{
  title: 'Les Misérables',
  author: 'Victor Hugo',
  bookId: 24280
},
{
  title: 'Harry Potter and the Half-Blood Prince (Harry Potter, #6)',
  author: 'J.K. Rowling',
  bookId: 1
}
];

const authors = [{
  name: 'Lev Tolstoy',
  authorId: 128382
},
{
  name: 'Victor Hugo',
  authorId: 13661
},
{
  name: 'J.K. Rowling',
  authorId: 1077326
}
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the server');

          const db = client.db(dbName);

          const responseBooks = await db.collection('books').insertMany(books);
          const responseAuthors = await db.collection('authors').insertMany(authors);

          res.json(responseBooks);
          res.json(responseAuthors);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
