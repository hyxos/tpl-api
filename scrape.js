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
  };

  rp(options)
  .then(function (scrape) {
    console.log('added to db');
  })
  .catch(function (err) {
    console.error('couldnt scrape', err);
  });
}

function scrape($) {
  //console.log(options.uri); // for url field
  var book = new Book ({
    title: $('h1 > span').text().replace(/\r?\n|\t/g, '').toLowerCase(),
    author: $('.bib-info .author > a').text().toLowerCase(),
    pages: $('div > div > div > div > span.text').text().match(/\b\d{3}\b/),
    isbn: $('div.clear-left > table > tbody > tr:nth-child(3).isbn > td:nth-child(2)').text().match(/\d*/),
    copyright: $('div.clear-left > table > tbody:nth-child(2) > tr:nth-child(2).public-information > td:nth-child(2)').text().match(/\d.*/),
    recordId: $('#full-record-hidden > tr:nth-child(1) > td').text(),
    numberCopies: $('#number-copies').text()
  });
  book.save(function (err) { 
    if (err) console.error('failed to save book', err);
    branchScrape(book.recordId, book.numberCopies);
  });  
}

function branchScrape(recordId, numberCopies) {
  var options = {
    uri: `http://www.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?itemId=${recordId}&numberCopies=${numberCopies}&print=`,
    transform: function (body) {
      return $.load(body);
    }
  };

  rp(options)
  .then(function ($) {
    console.log(options.uri);
    $('a').each(function (branch) { 
      console.log($(this).text()) 
    })
  })
  .catch(function (err) {
    console.error('couldnt scrape branch stuff', err);
  });
}