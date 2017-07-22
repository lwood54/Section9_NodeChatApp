    // built-in Node method to clean up path names
const path = require('path');
    // load http module
const http = require('http');
    // create a new express application
const express = require('express');
    // gain access to the generateMessage function
const {generateMessage, generateLocationMessage} = require('./utils/message');
    // get function to check for valid string
const {isRealString} = require('./utils/validation');
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

    socket.on('join', function(params, callback) {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.');
        }
        socket.join(params.room);
            // socket.leave('The Office Fans');

            // io.emit --> io.to('The Office Fans').emit();
            // socket.broadcast.emit --> socket.broadcast.to('The Office Fans').emit();
            // socket.emit

            // create a new message from server/admin to new user
        socket.emit('newMessage', generateMessage(`${params.room}`, 'Welcome to the chat app!'));

            // create a new message from server/admin to other users
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${params.room}`, `${params.name} has joined.`));

        callback();
    });

        // listening for a created message event from user
        // then emitting created message back out to everyone
        // including a callback function that can be set up to send info back if needed
    socket.on('createMessage', function(message, callback) {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

        // emit a new location message based on receiving the coords from the user
    socket.on('createLocationMessage', function(coords) {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
