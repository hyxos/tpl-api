var $ = require('cheerio'),
  rp = require('request-promise'),
  Book = require('../db/config')

module.exports = page => {
  var options = { uri: page, transform: body => scrape($.load(body)) }
  rp(options)
  .then((scrape) => console.log('added to db'))
  .catch(err => console.error(err))
}

var scrape = ($) => {
  var book = new Book ({
    title: $('h1 > span').text().replace(/\r?\n|\t/g, '').toLowerCase(),
    author: $('.bib-info .author > a').text().toLowerCase(),
    pages: $('div > div > div > div > span.text').text().match(/\b\d{3}\b/),
    isbn: $('div.clear-left > table > tbody > tr:nth-child(3).isbn > td:nth-child(2)').text().match(/\d*/),
    copyright: $('div.clear-left > table > tbody:nth-child(2) > tr:nth-child(2).public-information > td:nth-child(2)').text().match(/\d.*/),
    recordId: $('#full-record-hidden > tr:nth-child(1) > td').text(),
    numberCopies: $('#number-copies').text()
  })
  book.save(() => branchScrape(book))
}

var branchScrape = (book) => {
  var options = {
    uri: `http://www.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?
    itemId=${book.recordId}&numberCopies=${book.numberCopies}&print=`,
    transform: body => $.load(body)
  }

  rp(options)
  .then(($) => {
    $('a').each((branch) => {
      book.branches.push({ name: $(this).text() })
      book.save((err) => { if (err) console.error('branch save error', err) })
    })
  })
  .catch((err) => console.error('couldnt scrape branch stuff', err))
}
