var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  url: String,
  title: String,
  author: String,
  pages: String,
  copyright: String,
  isbn: String,
  recordId: String,
  numberCopies: String,
  copies_and_availability: {
    branch: String,
    format: String,
    location: String,
    status: String,
    call_number: String
  }
})

module.exports = mongoose.model('Book', BookSchema);
