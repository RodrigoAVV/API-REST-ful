const socket = io();
socket.on('OK_CONNECTION',data => {
    alert(data.message)
})