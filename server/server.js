    // built-in Node method to clean up path names
const path = require('path');
    // load http module
const http = require('http');
    // create a new express application
const express = require('express');
    // instead of (__dirname + '/../public')
const publicPath = path.join(__dirname, '../public');
    // get 'socket.io' resources
const socketIO = require('socket.io');


    // create environment variable to store PORT options
const port = process.env.PORT || 3000;
    // configure the express static middleware
var app = express();
    // create a variable that helps us create a server with http
var server = http.createServer(app);
    // set up the use of socket.io
var io = socketIO(server);
    // Use Express to connect our static/public folders and serve them up to browser
app.use(express.static(publicPath));

    // lets you listen for a 'connection' from the client
io.on('connection', function(socket) {
    console.log('New user connected.');

        // emit an event from the server to the client
    socket.emit('newMessage', {
        from: 'Tiffany',
        text: 'Hey there. Having fun with Node?',
        createdAt: 123
    });

        // listening for a created message even from user
    socket.on('createMessage', function(newMessage) {
        console.log('createMessage', newMessage);
    });


    // listening for a disconnect from user
    socket.on('disconnect', function() {
        console.log('User was disconnected');
    });
});
    // set up listen and serve of port
server.listen(port, function() {
    console.log(`Started up at port ${port}`);
});
