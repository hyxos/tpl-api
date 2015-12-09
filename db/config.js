var mongoose = require('mongoose')
require('./book')

mongoose.connect('mongodb://localhost/book')
mongoose.connection.on('connected', () => console.log('db connected'))
mongoose.connection.on('error', err => console.error(err))
mongoose.connection.on('disconnected', () => console.log('db connection disconnected'))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('connection disconnected through app termination')
    process.exit(0)
  })
})
