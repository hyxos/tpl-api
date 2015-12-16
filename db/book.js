var mongoose = require('mongoose'),
  imageValidator = src => src !== '/images/bibs/MC/no-image-book.png'

var bookSchema = new mongoose.Schema({
  title: { type: String, required: true, lowercase: true },
  author: { type: String, required: true, lowercase: true },
  image: { type: String, required: false, validate: imageValidator },
  pages: { type: String, required: true },
  year: { type: String, required: false },
  isbn: { type: String, required: false },
  uri: { type: String, required: true },
  id: { type: String, required: false },
  copies: { type: String, required: false },
  branches: [{
    _id: false,
    name: { type: String, required: false },
    status: { type: String }
  }]
})

module.exports = mongoose.model('Book', bookSchema)
