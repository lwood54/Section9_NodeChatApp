    // opens up a web socket connection
var socket = io();

function scrollToBottom() {
        // selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
        // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

    // listens for the server to connect with this client
socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

    // listens for the server to disconnect with this client
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

    // listen for update user list
socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });

    $("#users").html(ol);
});

    // listens for a new message from the server to this client
socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
        // use mustache.js to render
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

    // setting up a new listening event that defines the anchor tag
    // when it receives the info from the user that clicks share my location
socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

    // using jQuery to collect data from the from with id 'message-form'
    // then we are setting the text = to the value of what is in the input field
$('#message-form').on('submit', function(event) {
    event.preventDefault();
        // create textbox message variable for frequent use
    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
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
        return alert('Geolocation not supported by your browser.');
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
