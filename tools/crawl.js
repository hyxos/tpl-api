var cheerio = require('cheerio'),
  rp = require('request-promise'),
  q = require('bluebird'),
  scrape = require('./scrape'),
  request = require('request'),
  root = 'http://www.torontopubliclibrary.ca'

var options = {
    uri: `${root}/search.jsp?N=37906+38758&Ntk=Keyword_Anywhere&advancedSearch=true`,
    transform: body => cheerio.load(body)
  }

rp(options)
  .then( $ => getNewIndex($) )
  .catch( err => console.error('initial index load failed', err) )

var grabIndexUrls = $ => {
  var titles = $('div > div > div.title.align-top > a')
  return titles.map( (index, div) => $(div).attr('href') )
}

var createRequests = urls => {
  var requests = []
  urls.map( (index, url) => requests.push(scrape(root + url)) )
  return requests
}

var getNextPage = $ => $('.pagination-next').attr('href')

var getNewIndex = currentPage => {
  var requests = createRequests(grabIndexUrls(currentPage));
  q.all(requests).then( results => {
    console.log(`going to : ${root}${getNextPage(currentPage)}`)
    var options = { uri: root + getNextPage(currentPage), transform: body => cheerio.load(body) }
    rp(options)
      .then( page => getNewIndex(page) )
      .catch( err => console.error('coudlnt reach next search index', err) )
  }).catch( err => console.error('a request failed', err) )
}
