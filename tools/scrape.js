var $ = require('cheerio'),
  rp = require('request-promise'),
  db = require('../db/config'),
  Book = require('../db/book')

db()

module.exports = page => {
  var options = { uri: page, transform: body => scrape($.load(body)) }
  rp(options)
  .catch(err => console.error('scraper', err))
}

var scrape = $ => {
  var book = new Book ({
    title: $('#record-book-detail > h1').text().replace(/\r?\n|\t/g, ''),
    author: $('.bib-info .author > a').text(),
    pages: $('div > div > div > div > span').text().match(/\b\d{3}\b/),
    isbn: $('div.clear-left > table > tbody > tr:nth-child(3).isbn > td:nth-child(2)').text().match(/\d*/),
    copyright: $('#full-record-partial > tr:nth-child(2) > td').text().match(/\d.*/),
    id: $('#full-record-hidden > tr:nth-child(1) > td').text().match(/\d.*/),
    copies: $('#number-copies').text().match(/\d.*/)
  })

  if (book.copies) {
    var options = {
      uri: `http://www.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?itemId=${book.id}&numberCopies=${book.copies}&print=`,
      transform: body => $.load(body)
    }

    rp(options)
    .then(($) => {
      $('tr').slice(1).each(function () {
        book.branches.push({
          name: $(this).find('a').text(),
          status: $(this).find('td:nth-child(4)').find('span').text()
        })
      })
      book.save((err) => { if (err) console.error(`book: ${book.title}`, err) })
    })
    .catch(err => console.error('couldnt load branch', err))
  }
}
