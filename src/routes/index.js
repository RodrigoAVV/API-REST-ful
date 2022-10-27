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
.use('/productos',productosRouter)
module.exports = router