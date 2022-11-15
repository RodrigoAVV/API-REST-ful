const socket = io()

const messages = []


function updateMessages(messages){
    let messagesToList = ''
    //console.log(message)
    messages.forEach(i => {
        messagesToList = messagesToList + `<li> ${i.content}</li>`
    })
    document.querySelector('#messagesList').innerHTML = messagesToList
}

function sendNewMessage(){
    var today = new Date();
 
    var now = today.toLocaleString();
    
    let message = document.querySelector('#correo').value
    let mje = document.querySelector('#message').value
    if(message == '' || mje == '' || !(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/).test(message)) return
    message = `<em class="correo">${message}</em>` + ` <em class="fecha">${now}</em> ` + ' ' + `<em class="mje">${mje}</em>`

    socket.emit('NEW_MESSAGE_CLI',message)
    document.querySelector('#correo').value = ''
    document.querySelector('#message').value = ''
}

socket.on('NEW_MESSAGE',data => {
    messages.push(data)
    updateMessages(messages)
})

socket.on('UPDATE_DATA',messagesArray => {
    messagesArray.forEach(i => {
        messages.push(i)
    })
    updateMessages(messages)
})

let id = 1
let products = [
    {
        "id": 1,
        "titulo": "Hamburguesa",
        "precio": 3890,
        "imagen": "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-64.png"
    }
]

function updateProducts(products){
    let messagesToList = ''
    //console.log(product)
    products.forEach(i => {
        messagesToList = messagesToList + `<tr> 
        <td>${i.id}</td>
        <td>${i.titulo}</td>
        <td>${i.precio}</td>
        <td><img src="${i.imagen}"></td>
        </tr>`
    })
    document.querySelector('#dataProduct').innerHTML = messagesToList
}

function senNewProduct(){
    const title = document.querySelector('#titulo').value
    const price = document.querySelector('#precio').value
    const image = document.querySelector('#imagen').value
    id = id + 1
    if(title == '' || price == '' || image == '') return
    const product = {id:id,titulo:title,precio:price,imagen:image}
    //console.log(product) //se crea 
    socket.emit('NEW_PRODUCT_CLI',product)
    document.querySelector('#titulo').value = ''
    document.querySelector('#precio').value = ''
    document.querySelector('#imagen').value = ''
    //document.querySelector('#dataProduct').innerHTML = `<tr><td>Hola</td></tr>`
}

socket.on('NEW_PRODUCT',data => {
    products.push(data)
    updateProducts(products)
})

socket.on('UPDATE_PRODUCT',messagesArray => {
    messagesArray.forEach(i => {
        products.push(i)
    })
    updateProducts(products)
})
