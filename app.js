const express = require('express')

const {Server: HttpServer} = require('http')
const {Server:IoServer} = require('socket.io')

const _ = require('lodash')
const indexRouter = require('./src/routes/index')
require('dotenv').config()

const logger = require('morgan')

const app = express()

const http = new HttpServer(app)
const io = new IoServer(http)


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(logger('dev'))

//app.set('views','./views')
//app.set('view engine', 'ejs')

app.use('/',indexRouter)
//app.use('/views',express.static(__dirname + '/views'))
io.on('connection',(socket) => {
    console.log(socket)
    socket.emit('OK_CONNECTION',{message:`Socket id: ${socket.id}`})
})
module.exports = app