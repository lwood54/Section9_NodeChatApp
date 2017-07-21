    // generates a message using the from and text values collected
var generateMessage = function(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

    // generates a location message that provides the url link that uses the supplied coords
var generateLocationMessage = function(from, latitude, longitude) {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
};
