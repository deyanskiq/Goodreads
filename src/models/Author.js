const mongoose = require('mongoose');

// const {
//   Schema
// } = mongoose;

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  authorId: {
    type: Number,
    required: true // will not create a todo without this content property
  }
  // },
  // books: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'book',
  //   required: true
  // }]
});

const AuthorModel = mongoose.model('Author', AuthorSchema);
module.exports = AuthorModel;