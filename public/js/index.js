    // opens up a web socket connection
var socket = io();

    // listens for the server to connect with this client
socket.on('connect', function() {
    console.log('Connected to server');

        // emitting a create message event
    socket.emit('createMessage', {
        from: 'Logan',
        text: 'Hey, I hope the girls stop fighting soon!'
    });
});

    // listens for the server to disconnect with this client
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

    // listens for a new message from the server to this client
socket.on('newMessage', function(newMessage) {
    console.log('There is a new message!', newMessage);
});


// CHALLENGE
//  1. create 'newMessage'
//      a. this will be emitted by the server and listend to on the client
//      b. data will include: from, text, createdAt
//  2. create 'createMessage'
//      a. emitted by the client to the server
//      b. data: from, text
