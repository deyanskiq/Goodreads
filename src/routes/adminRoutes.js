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
  title: 'test2-mongo',
  author: 'test2-author',
  bookId: 24280
},
{
  title: 'test3-mongo',
  author: 'test3-author',
  bookId: 24280
}
];

function router(nav) {
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

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
