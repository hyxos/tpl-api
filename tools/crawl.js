var cheerio = require('cheerio'),
  rp = require('request-promise'),
  q = require('bluebird'),
  scrape = require('./scrape'),
  request = require('request'),
  root = 'http://www.torontopubliclibrary.ca'

var options = {
<<<<<<< f69ab0c33dfe67c6318add7f1a6fd3c4edd57858
    uri: `${root}/search.jsp?N=37918+20206&No=60&Ns=p_date_acquired_sort&Nso=1&Ntk=Keyword_Anywhere&advancedSearch=true`,
=======
    uri: `${root}/search.jsp?Ntk=Keyword_Anywhere&N=0&advancedSearch=true&Ntt=science+fiction`,
>>>>>>> can pull data api
    transform: body => cheerio.load(body)
  }

rp(options)
  .then($ => getIndex($))
  .catch(err => console.error('initial index load failed', err))

var getIndexURLs = $ => {
  var titles = $('div > div > div.title.align-top > a')
  return titles.map((index, div) => $(div).attr('href'))
}

var setRequests = urls => {
  var requests = []
  urls.map((index, url) => requests.push(scrape(root + url)))
  return requests
}

var getNextPage = $ => $('.pagination-next').attr('href')

var getIndex = currentPage => {
  var requests = setRequests(getIndexURLs(currentPage));
  q.all(requests).then( results => {
    var options = { uri: root + getNextPage(currentPage), transform: body => cheerio.load(body) }
    rp(options)
      .then(page => getIndex(page))
      .catch(err => console.error('coudlnt reach next search index', err))
  }).catch(err => console.error('a request failed', err))
}
