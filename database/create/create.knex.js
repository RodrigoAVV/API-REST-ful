const options = {
    client:'mysql',
    connection:{
        host: process.env.SQL_HOST || 'localhost',
        user: process.env.SQL_USER || 'root',
        password: process.env.SQL_PASSWORD || '',
        database: process.env.SQL_DATABASE || 'bdProductos'
    }
}
module.exports = {
    options
}