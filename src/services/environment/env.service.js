const getEnvironment = () =>{
    return process.env.ENVIRONMENT || 'UNDEFINED'
}

module.exports = getEnvironment