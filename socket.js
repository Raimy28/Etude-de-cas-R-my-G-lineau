// socket.js
const socketIO = require('socket.io');

function initializeSocket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Ajoutez ici la logique des événements socket nécessaires
    // par exemple, io.emit pour diffuser un message à tous les clients connectés
  });

  return io;
}

module.exports = initializeSocket;
