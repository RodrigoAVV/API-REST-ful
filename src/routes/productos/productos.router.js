const express = require('express')
const router = express.Router()

const Product = require('../../services/products.service')

router.get('/',(_req,res) => {
    try {
        //return res.render('create')
        res.sendFile('index.html',{root: __dirname})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/productos',(_req,res) => {
    try {
        const product = new Product()
        return res.render('index',{productos:product.getProduct()})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/productos',(req,res) =>  {
    try {
        const product = new Product()
        const { body } = req
        body.id = product.selfGenerator()
        product.postProduct(body)
        return res.redirect('/productos')
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router