let products = [
    {
        "id": 1,
        "titulo": "Hamburguesa",
        "precio": 3890,
        "imagen": "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-64.png"
    },
    {
        "id": 2,
        "titulo": "pizza",
        "precio": 5600,
        "imagen": "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/pizza-fast-food-bake-bread-64.png"
    },
    {
        "id": 3,
        "titulo": "Sopa caliente",
        "precio": 1890,
        "imagen": "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/noodles-bowl-food-ramen-soup-64.png"
    }
]
class Product{
    constructor(){}
    getProduct(){
        return products
    }

    postProduct(product){
        products.push(product)
        return product
    }

    selfGenerator(){
        let cant = products.length
        return products[cant-1].id + 1
    }
}

module.exports = Product