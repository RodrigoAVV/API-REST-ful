const express = require('express')

const {Server: HttpServer} = require('http')
const {Server:IoServer} = require('socket.io')

const _ = require('lodash');
const indexRouter = require('./src/routes/index')
require('dotenv').config()

const errorHandler = require('./src/middlewares/errorHandler')

const logger = require('morgan')

const app = express()

const http = new HttpServer(app)
const io = new IoServer(http)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.use(logger('dev'))

app.use(errorHandler)

//app.set('views','./views')
//app.set('view engine', 'ejs')

app.use('/',indexRouter)

//app.use('/views',express.static(__dirname + '/views'))
const messages = []

io.on('connection',(socket) => {
    socket.emit('UPDATE_DATA',messages)
    socket.on('NEW_MESSAGE_CLI',data => {
        //console.log(data)
        const messageData = {content:data}
        messages.push(messageData)
        io.sockets.emit('NEW_MESSAGE',messageData)
    })
})

let products = [
    {
        "id": 1,
        "titulo": "Hamburguesa",
        "precio": 3890,
        "imagen": "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-64.png"
    }
]
io.on('connection', (socket) => {
    socket.emit('UPDATE_PRODUCT',products)
    socket.on('NEW_PRODUCT_CLI',data => {
        console.log(data)
        const messageData = {id:data.id,titulo:data.titulo,precio:data.precio,imagen:data.imagen}
        products.push(messageData)
        io.sockets.emit('NEW_PRODUCT',messageData)
    })
})
module.exports = http