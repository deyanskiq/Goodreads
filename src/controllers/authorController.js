const debug = require('debug')('app:authorController');

const {
  MongoClient,
  ObjectID
} = require('mongodb');

function authorController(authorService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the server');

        const db = client.db(dbName);

        const col = await db.collection('authors');

        const authors = await col.find().toArray();
        // authors.forEach(async (author) => {
        //   author.details = await authorService.getauthorById(author.authorId);
        // });
        res.render('authorListView', {
          title: 'Library',
          authors,
          nav
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const {
      id
    } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the server');
        const db = client.db(dbName);
        const col = await db.collection('authors');

        const author = await col.findOne({
          _id: new ObjectID(id)
        });
        author.details = await authorService.getAuthorById(author.authorId);
        debug(author.details);
        res.render('authorView', {
          title: 'Library',
          author,
          nav
        });
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
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
module.exports = authorController;
