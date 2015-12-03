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
    var urls = $('div > div > div.title.align-top > a');
    $(urls).each(function () {
      console.log($(this).attr('href'));
    })
  })
  .catch(function (err) {
    console.log(err)
  });