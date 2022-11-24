const express = require('express')
const router = express.Router()
const _= require('lodash')

const Product = require('../../services/products.service')

const product = new Product()

router.get('/',async (_req,res,next) => {
    try {
        const data = await product.getProducts()
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id',async (req,res, next) => {
    const { id } = req.params
    if(_.isNil(id)){
        return res.status(400).json({
            success:false,
            message:'Bad request'
        })
    }
    try {
        const data = await product.getProduct(id)
        if(!data.success){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})
router.post('/', async (req,res,next) =>  {
    const { body } = req
    if(_.isNil(body)){
        return res.status(400).json({
            success:false,
            message:'Bad request'
        })
    }
    try {
        const data = await product.createProduct(body)
        if(!data.succes){
            return res.status(400).json(data)
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router