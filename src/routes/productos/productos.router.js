const express = require('express')
const router = express.Router()
let productos = [
    {
        "id": 1,
        "titulo": "Hamburguesa",
        "precio": 3890,
        "imagen": "url3"
    },
    {
        "id": 2,
        "titulo": "pizza",
        "precio": 5600,
        "imagen": "url3"
    },
    {
        "id": 3,
        "titulo": "completo italiano",
        "precio": 1890,
        "imagen": "url4"
    }
]

const selfGenerator = () => {
    let cant = productos.length
    return productos[cant-1].id + 1
}

router.get('/',(_req,res) => {
    try {
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id',(req,res) => {
    try {
        const { id } = req.params
        const selected = productos.filter(i => i.id == id)
        if(selected.length > 0){
            res.status(200).json({
                success: true,
                data: selected
            })
        }else{
            res.status(200).json({
                success: true,
                error: 'Producto no encontrado'
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/',(req,res) =>  {
    try {
        const { body } = req
        body.id = selfGenerator()
        productos.push(body)
        res.status(200).json({
            success: true,
            data: body
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id',(req,res) => {
    try {
        const { id } = req.params
        let flag = false
        productos.forEach(function(item) {
            if (item.id == id) {
                item.titulo = "Nuevo titulo"
                item.precio = 12000
                item.imagen = "Nueva imagen"
               flag=true
               return
            }
        })
        res.status(200).json({
            success: flag
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id',(req,res) => {
    try {
        const { id } = req.params
        let flag = false
        let contador = -1
        for(let i = 0 ; i < productos.length ; i++){
            if(productos[i].id == id){
                contador = i
                flag = true
                break
            }
        }
        contador >= 0 ? productos.splice(contador,1) : ''
        res.status(200).json({
            success: flag
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router