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
  var query = {
    limit: req.query.limit || 10
  }
  if (req.query.branch) {
    query.branch = req.query.branch
  }
  if (req.query.title) {
    query.title = req.query.title
  }
  if (req.query.author) {
    query.author = req.query.author
  }

  book.
    find(query).
    limit(query.limit).
    exec((err, books) => res.json(books))
})

module.exports = app
