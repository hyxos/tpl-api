var cheerio = require('cheerio');
var rp = require('request-promise');

var options = {
  uri: 'http://www.torontopubliclibrary.ca/search.jsp?N=37906+38758&Ntk=Keyword_Anywhere&advancedSearch=true',
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {
    var titles = $('div > div > div.title.align-top > a');
    var titleUrls = titles.map(function (index,div) {
      // debugger;
      return $(div).attr('href')
    })
    var promisesArray = titleUrls.map(function (url) {
      var options = {
        uri: 'http://www.torontopubliclibrary.ca/' + url,
        transform: function (body) {
          return cheerio.load(body);
        }
      }
      return rp(options) //returning a promise
    })
    debugger;

    // once all promises are resolved
    // bluebird
    var allPromises = Promise.all(promisesArray) // var Promise = require('bluebird')
    // Promise.all returns an array, which reps all the promisesAll
    // allPromises is a promise as well
    debugger; //allPromises is just one promise
    //allPromises.then(function(//allResults in an array))


  })
  .catch(function (err) {
    console.log(err)
  });