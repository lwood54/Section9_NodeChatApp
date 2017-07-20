    // built-in Node method to clean up path names
const path = require('path');
    // instead of (__dirname + '/../public')
const publicPath = path.join(__dirname, '../public');
    // create a new express application
const express = require('express');
    // create environment variable to store PORT options
const port = process.env.PORT || 3000;

    // configure the express static middleware
var app = express();
app.use(express.static(publicPath));

    // set up listen and serve of port
app.listen(port, function() {
    console.log(`Started up at port ${port}`);
});
