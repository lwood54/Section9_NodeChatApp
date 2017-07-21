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

    // setting up a new listening event that defines the anchor tag
    // when it receives the info from the user that clicks share my location
socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

    // using jQuery to collect data from the from with id 'message-form'
    // then we are setting the text = to the value of what is in the input field
$('#message-form').on('submit', function(event) {
    event.preventDefault();
        // create textbox message variable for frequent use
    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() { // this is the acknowledgement callback, we can use this to clear the message after it is sent
        messageTextbox.val('');
    });
});

    // save html field access to a variable
var locationButton = $('#send-location');
    // add click event for when someone clicks this button
locationButton.on('click', function() {
        // notify user when browser does not support geolocation api
    if (!navigator.geolocation) {
        return alert('Geolcation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

        // get location using geolocation api services
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});
