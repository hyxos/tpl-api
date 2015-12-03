'use strict'

var cheerio = require('cheerio');
var rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book'); // connect to our database
var Book = require('./app/models/book');

var options = {
  uri: 'http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3196744&R=3196744',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {
    var book = new Book(); // create a new instance of the Book model
    book.title = $('h1 > span').text().replace(/\r?\n|\t/g, '').toLowerCase() // sanatizing
    book.author = $('.bib-info .author > a').text().toLowerCase()
    book.pages = $('div > div > div > div > span.text').text()
    book.save(function (err) {
      if (err) console.log(err);
      console.log('Book created!' + book );
      mongoose.disconnect();
    });

    // Book.create(book, function (err, book) { // posting to db
    //   if (err) console.log(err);
    //   // saved!
  })
  .catch(function (err) {
    console.log(err)
  });