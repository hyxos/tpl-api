'use strict'

var cheerio = require('cheerio');
var rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book'); // connect to our database
var Book = require('./models/book');

var options = {
  uri: 'http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3339749&R=3339749',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {
    var book = {
      title: $('h1 > span').text().replace(/\r?\n|\t/g, '').toLowerCase(), // sanatizing
      author: $('.bib-info .author > a').text().toLowerCase(),
      pages: $('div > div > div > div > span.text').text(),
    } 
    console.log(book)
    // Book.create(book, function (err, book) { // posting to db
    //   if (err) return handleError(err);
    //   // saved!
    //   console.log(book)
    // });
  })
  .catch(function (err) {
    console.log(err)
  });