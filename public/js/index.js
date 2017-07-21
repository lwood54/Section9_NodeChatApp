    // opens up a web socket connection
var socket = io();

    // listens for the server to connect with this client
socket.on('connect', function() {
    console.log('Connected to server');
});

    // listens for the server to disconnect with this client
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

    // listens for a new message from the server to this client
socket.on('newMessage', function(message) {
    console.log('There is a new message!', message);
});
