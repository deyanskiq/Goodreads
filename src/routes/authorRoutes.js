const express = require('express');
const authorController = require('../controllers/authorController');

const authorRouter = express.Router();
const authorService = require('../services/goodreadsAuthorService');

function router(nav) {
  const { getIndex, getById, middleware } = authorController(authorService, nav);
  authorRouter.use(middleware);
  authorRouter.route('/').get(getIndex);

  authorRouter.route('/:id')
    .get(getById);

  return authorRouter;
}
module.exports = router;
