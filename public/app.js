const socket = io();

$('form').submit(() => {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', message => {
  $('#messages').append($('<li>').text(message));
});

socket.on('user connection', message => {
  $('#messages').append($('<li>').text('user connected'));
});

socket.on('user disconnection', message => {
  $('#messages').append($('<li>').text('user disconnected'));
});