let io ;

const initIo = (server)=>{
    io = require('socket.io')(server,{
        cors :'*'
    })
    return io
}


const getIo = (server)=>{
    if (!io) {
      console.log('in-valid io');  
    } else {
        return io
    }
}

module.exports = {
    initIo,
    getIo
}