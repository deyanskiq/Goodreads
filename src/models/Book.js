const mongoose = require('mongoose');

// const {
//   Schema
// } = mongoose;

const BookSchema = new mongoose.Schema({
  title: {
    type: String, // will be a string
    required: true // will not create a todo without this content property
  },
  author: {
    type: String,
    required: true
  },
  // we have a relationship here. A dog belongs to an owner.
  // we can store the owners id here on the owner field. ObjectId are
  // ids in mongoose. the ref key is telling mongoose what model that
  // id belongs too. Helpful for when we ask the dog who its owner is
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Author',
  //   required: true
  // },
  bookId: {
    type: Number,
    required: true // will not create a todo without this content property
  }
});

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;