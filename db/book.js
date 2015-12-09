var mongoose = require('mongoose')

var branchSchema = new mongoose.Schema({
    name: String
})

var bookSchema = new mongoose.Schema({
  url: String,
  title: String,
  author: String,
  pages: String,
  copyright: String,
  isbn: String,
  recordId: String,
  numberCopies: String,
  branches: [branchSchema]
})

var Book = module.exports = mongoose.model('Book', bookSchema)
