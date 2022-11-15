const socket = io()

const messages = []


function updateMessages(message){
    let messagesToList = ''
    console.log(message)
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

const products = {}
function updateProducts(product){
    let messagesToList = ''
    console.log(mesproduct)
    messages.forEach(i => {
        messagesToList = messagesToList + `<tr>
            <td>${i.id}</td>
            <td>${i.title}</td>
            <td>${i.price}</td>
            <td>${i.image}</td>
        </tr>`
    })
    document.querySelector('#dataProduct').innerHTML = messagesToList
}
let id = 0
function senNewProduct(){
    const title = document.querySelector('#titulo').value
    const price = document.querySelector('#precio').value
    const image = document.querySelector('#imagen').value
    id + 1
    let product = {id:id,title:title,price:price,image:image}
    
    socket.emit('NEW_MESSAGE_PROD',product)
    document.querySelector('#titulo').value = ''
    document.querySelector('#precio').value = ''
    document.querySelector('#imagen').value = ''
    //document.querySelector('#dataProduct').innerHTML = `<tr><td>Hola</td></tr>`
}

socket.on('NEW_PRODUCT',data => {
    products.push(data)
    updateProducts(messages)
})

socket.on('UPDATE_PRODUCT',messagesArray => {
    messagesArray.forEach(i => {
        products.push(i)
    })
    updateProducts(products)
})
