'use strict'

var cheerio = require('cheerio');
var rp = require('request-promise');
var q = require('bluebird');
var scrape = require('./scrape')

var root = 'http://www.torontopubliclibrary.ca'

var options = {
  uri: root + '/search.jsp?N=37906+38758&Ntk=Keyword_Anywhere&advancedSearch=true',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {
    var titles = $('div > div > div.title.align-top > a');
    var urls = titles.map(function (index, div) { // collecting urls
      return $(div).attr('href')
    });

    var requests = [];
    urls.map(function (index, url) { // creating promises from requests on urls
      requests.push(scrape(root + url));
    });

    // once all promises are resolved
    q.all(requests).then(function (results) { // q.all is a single promise to represent all url query promises
      console.log('done ' + results.length);
      debugger
    }).catch(function (err) {
      console.error('a request failed', err)
    });
  })
  .catch(function (err) {
    console.error('initial load failed', err)
  });