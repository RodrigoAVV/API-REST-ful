const express = require('express')
const productosRouter = require('./productos/productos.router')
const router = express.Router()

router.get('/health',(_req, res) => {
    res.status(200).json({
        success: true,
        helath: 'Up',
        envronment: process.env.ENVIRONMENT || 'NOT FOUND'
    })
})
//Se Cargan todas las rutas
.use('/',productosRouter)
module.exports = router