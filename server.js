const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.locals.title = 'Socket IO Chat';

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connect', socket => {
  io.emit('user connection', 'user connected');
  socket.on('disconnect', () => {
    io.emit('user disconnection', 'user disconnected');
  });
  socket.on('chat message', message => {
    io.emit('chat message', message);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log(`${app.locals.title} is running on port ${process.env.PORT}`);
});