const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Cambia al puerto del frontend
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
