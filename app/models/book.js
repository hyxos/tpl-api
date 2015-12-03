var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  pages: Number,
  copyright: Number,
  isbn: Number,
  record_id: Number,
  copies_and_availability: {
    branch: String,
    format: String,
    location: String,
    status: String,
    call_number: String
  }

})

module.exports = mongoose.model('Book', BookSchema);
