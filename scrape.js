'use strict'

var $ = require('cheerio'); 
var rp = require('request-promise');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book');
var Book = require('./app/models/book');

module.exports = function (page) {
  var options = {
    uri: page,
    transform: function (body) {
      return scrape($.load(body))
    }
  }
  rp(options)
  .then(function (scrape) {
    console.log('recorded added to db');
  })
  .catch(function (err) {
    console.error('couldnt scrape', err);
  });
}

function scrape($) {
  var book = new Book ({
    title: $('h1 > span').text().replace(/\r?\n|\t/g, '').toLowerCase(),
    author: $('.bib-info .author > a').text().toLowerCase(),
    pages: $('div > div > div > div > span.text').text()
  });
  book.save(function (err) { 
    if (err) console.log(err);
    mongoose.disconnect();
  });  
}