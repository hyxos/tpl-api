var express = require('express'),
  morgan = require('morgan'),
  bp = require('body-parser'),
  book = require ('../db/book'),
  db = require ('../db/config'),
  app = express()

db()
app.use(morgan('dev')) // logger
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.listen(3000, () => console.log('magic happens on port 3000'))

app.get('/books', (req, res) => {
  var limit = req.query.limit || 10
  var query = {}

  if (req.query.branch) {
    query.branch = new RegExp(req.query.branch, 'i')
  } if (req.query.title) {
    query.title = new RegExp(req.query.title, 'i')
  } if (req.query.author) {
    query.author = new RegExp(req.query.author, 'i')
  }

  book.find(query).limit(limit).exec((err, books) => res.json(books))
})
