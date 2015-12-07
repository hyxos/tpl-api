'use strict'

var cheerio = require('cheerio');
var rp = require('request-promise');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book'); // connect to our database
var Book = require('./app/models/book');

var options = {
  uri: 'http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3335148&R=3335148',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {
    var book = new Book ({
      title: $('h1 > span').text().replace(/\r?\n|\t/g, '').toLowerCase(),
      author: $('.bib-info .author > a').text().toLowerCase(),
      pages: $('div > div > div > div > span.text').text().match(/\b\d{3}\b/),
      isbn: $('div.clear-left > table > tbody > tr:nth-child(3).isbn > td:nth-child(2)').text().match(/\d*/),
      copyright: $('div.clear-left > table > tbody:nth-child(2) > tr:nth-child(2).public-information > td:nth-child(2)').text().match(/\d.*/),
      recordId: $('#full-record-hidden > tr:nth-child(1) > td').text(),
      numberCopies: $('#number-copies').text()
    });
    console.log(book);
    branchScrape(book.recordId, book.numberCopies);
  })
  .catch(function (err) {
    console.log(err)
  });

  function branchScrape(recordId, numberCopies) {
    var options2 = {
      uri: `http://www.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?itemId=${recordId}&numberCopies=${numberCopies}&print=`,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    rp(options2)
    .then(function ($) {
      debugger;
      console.log(options2.uri);
      $('a').each(function (branch) { 
        console.log($(this).text()) 
      })
    })
    .catch(function (err) {
      console.error('couldnt scrape branch stuff', err);
    });
}