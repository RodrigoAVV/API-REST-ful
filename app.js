const express = require('express')
const _ = require('lodash')
const indexRouter = require('./src/routes/index')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views','./views')
app.set('view engine', 'ejs')

app.use('/',indexRouter)
//app.use('/views',express.static(__dirname + '/views'))

module.exports = app