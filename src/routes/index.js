const express = require('express')
const productosRouter = require('./productos/productos.router')
const getEnv = require('../services/environment/env.service')
const router = express.Router()

router.get('/health',(_req, res) => {
    res.status(200).json({
        success: true,
        helath: 'Up',
        envronment: getEnv()
    })
})
//Se Cargan todas las rutas
.use('/productos',productosRouter)
module.exports = router