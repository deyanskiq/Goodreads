const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  readBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true
  }]
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;