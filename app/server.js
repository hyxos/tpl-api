var express = require('express'),
  morgan = require('morgan'),
  bp = require('body-parser'),
  book = require ('../db/book'),
  db = require ('../db/config'),
  app = express()

db()
app
  .use(morgan('dev')) // logger
  .use(bp.urlencoded({ extended: true }))
  .use(bp.json())
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  .get('/books', (req, res) => {
    var query = {}
    var limit = req.query.limit || 10
    var order = req.query.order || -1
  
    if (req.query.branch) query.branch = new RegExp(req.query.branch, 'i')
    if (req.query.title) query.title = new RegExp(req.query.title, 'i')
    if (req.query.author) query.author = new RegExp(req.query.author, 'i')
    
    book
      .find(query)
      .limit(limit)
      .sort({ title: order })
      .exec((err, books) => res.json(books))
})
.listen(3000, () => console.log('magic happens on port 3000'))
