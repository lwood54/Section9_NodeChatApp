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
        // creating a var representing the html li field
    var li = $('<li></li>');
        // setting the li field text using template tags and data collected
        // from the 'message' variable that received our data
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

    // using jQuery to collect data from the from with id 'message-form'
    // then we are setting the text = to the value of what is in the input field
$('#message-form').on('submit', function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});
