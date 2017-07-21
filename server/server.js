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

        // listening for a created message event from user
        // then emitting created message back out to everyone
    socket.on('createMessage', function(message) {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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
