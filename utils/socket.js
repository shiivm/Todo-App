let io;

module.exports = {
    init : server => {
        io = require('socket.io').listen(server);
        return io;
    },
    getIO : () => {
        if(!io) throw new Error("Socket.io not initialized!!");
        return io;
    }
}