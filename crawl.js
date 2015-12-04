var cheerio = require('cheerio');
var rp = require('request-promise');
var q = require('bluebird');

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
    })
    // var requests = urls.forEach(function (url) {
    //   return (rp(root + url));
    // });
    var requests = [];
    urls.map(function (index, url) { // creating promises from requests on urls
      requests.push(rp(root + url));
    });
    // once all promises are resolved
    q.all(requests).then(function (results) { // q.all == single promise to represent all url query promises
      console.log('done ' + results.length)
    })
    .catch(function (err) {
      console.error('a request failed', err)
    });
  })
  .catch(function (err) {
    console.error(err)
  });