const {options} = require('../../database/create/create.knex')
const knex = require('knex')
const {v4:uuidv4} = require('uuid')
class Product{
    constructor(){
        this.knex = knex(options)
    }
    async getProducts(){
        try {
            const data = await this.knex.from('productos').select('*')
            if(data.length == 0){
                return{
                    success:false,
                    message:'Productos no disponibles'
                }
            }
            const productoFormat = JSON.parse(JSON.stringify(data))
            return{
                success:true,
                data:productoFormat
            }
        } catch (err) {
            return{
                success:false,
                message:err.message
            }
        }
    }

    async getProduct(productCode){
        try {
            const data = await this.knex.from('productos').where('codigo','=',productCode).select('*')
            if(data.length == 0){
                return{
                    success:false,
                    message:'Product not found'
                }
            }
            const productFormat = JSON.parse(JSON.stringify(data[0]))
            return{
                success:true,
                data:productFormat
            }
        } catch (err) {
            console.error(err)
            return{
                success:false,
                message:err.message
            }
        }
    }
    async createProduct(product){
        Object.assign(product,{
            codigo:uuidv4()
        })
        return  new Promise((resolve, reject) => {
            this.knex('productos').insert(product).then(() => {
                resolve({
                    succes:true,
                    data:product
                })
            }).catch(err => {
                reject(err)
            }).finally(() => {
                this.knex.destroy()
            })
        })
    }

    
}

module.exports = Product