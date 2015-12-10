var mongoose = require('mongoose')

var bookSchema = new mongoose.Schema({
  title: { type: String, required: true, lowercase: true },
  author: { type: String, required: true, lowercase: true },
  pages: { type: String, required: false },
  year: { type: String, required: false },
  isbn: { type: String, required: false },
  id: { type: String, required: false },
  copies: { type: String, required: false },
  branches: [{
    _id: false,
    name: { type: String, required: true },
    status: { type: String }
  }]
})

module.exports = mongoose.model('Book', bookSchema)
