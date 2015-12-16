var $ = require('cheerio'),
  rp = require('request-promise'),
  db = require('../db/config'),
  Book = require('../db/book')

db()

module.exports = page => {
  var options = { uri: page, transform: body => scrape($.load(body), page) }
  rp(options)
  .catch(err => console.error('scraper', err))
}

var scrape = ($, page) => {
  var book = new Book ({
    uri: page,
    title: $('#record-book-detail > h1').text().replace(/\r?\n|\t/g, ''),
    author: $('div.grid_8 > div.record-detail > div.bib-info > div:nth-child(1).author > a:nth-child(2)').text().replace(/\d/, ''),
    pages: $('div > div > div > div > span').text().match(/\b\d{3}\b/),
    isbn: $('#full-record-partial > tr.isbn > td').text(),
    copyright: $('#full-record-partial > tr:nth-child(2) > td').text().match(/\d.*/),
    image: $('#bib-detail > div.grid_4.alpha > div > img').attr('src'),
    id: $('#full-record-hidden > tr:nth-child(1) > td').text(),
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
