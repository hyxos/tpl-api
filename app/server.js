'use strict'

var express = require('express')
var morgan = require('morgan')
var bp = require('body-parser')
var app = express()

app.use(morgan('dev')) // logger
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())

app.use('/api', import router from '/routes')

app.listen(3000, function() {
    console.log('magic happens on port 3000')
});

export { app };