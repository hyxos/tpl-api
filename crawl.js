'use strict'

var cheerio = require('cheerio');
var rp = require('request-promise');
var q = require('bluebird');
var scrape = require('./scrape')
var request = require('request');

var root = 'http://www.torontopubliclibrary.ca'

var options = {
  uri: root + '/search.jsp?N=37906+38758&Ntk=Keyword_Anywhere&advancedSearch=true',
  transform: function (body) {
    return cheerio.load(body);
  }
};

function grabIndexUrls ($) {
  var titles = $('div > div > div.title.align-top > a');
  return titles.map(function (index, div) { // collecting urls
    return $(div).attr('href')
  });    
}

function createRequests (urls) {
  var requests = [];
  urls.map(function (index, url) { // creating promises from requests on urls
    requests.push(scrape(root + url));
  });
  return requests;
}

function getNextPage($) {
  return $('.pagination-next').attr('href');
}

function requestNextPage(url) {
  request(root + url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return cheerio.load(body); // returning too late....
    }
  })
}

function getNewIndex(currentPage) {
  var requests = createRequests(grabIndexUrls(currentPage));
  q.all(requests).then(function (results) { // once all promises are resolved
    console.log('going to :' + root + getNextPage(currentPage));
    currentPage = requestNextPage(getNextPage(currentPage)); // load next index of pages...
    getNewIndex(currentPage);
  }).catch(function (err) {
      console.error('a request failed', err)
  });
}

rp(options)
  .then(function ($) {
    getNewIndex($);
  })
  .catch(function (err) {
    console.error('initial index load failed', err)
  });

