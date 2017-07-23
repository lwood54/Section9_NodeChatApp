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
const {Users} = require('./utils/users');

    // create environment variable to store PORT options
const port = process.env.PORT || 3000;
    // configure the express static middleware
var app = express();
    // create a variable that helps us create a server with http
var server = http.createServer(app);
    // set up the use of socket.io
var io = socketIO(server);
    // create new instance of users that we can add data to and call form
var users = new Users();

    // Use Express to connect our static/public folders and serve them up to browser
app.use(express.static(publicPath));

    // lets you listen for a 'connection' from the client
io.on('connection', function(socket) {
    console.log('New user connected.');

    socket.on('join', function(params, callback) {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
            // user joins the room
        socket.join(params.room);
            // remove the user from all previous lists in case they were in another room
        users.removeUser(socket.id);
            // add the user to the list of users in the room
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage(`${params.room} group: `, 'Welcome to the chat app!'));

            // create a new message from server/admin to other users
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`${params.room} group: `, `${params.name} has joined.`));

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
        io.emit('newLocationMessage', generateLocationMessage(`${params.room} group: `, coords.latitude, coords.longitude));
    });

    // listening for a disconnect from user
    socket.on('disconnect', function() {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(`Admin`, `${user.name} has left`));
        }

    });
});
    // set up listen and serve of port
server.listen(port, function() {
    console.log(`Started up at port ${port}`);
});
