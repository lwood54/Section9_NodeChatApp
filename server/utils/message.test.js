    // enable the usage of the 'expect' package
const expect = require('expect');

    // create a variable that pulls in a specific function from the file './message'
var {generateMessage} = require('./message');

describe('generateMessage', function() {
    it('should generate correct message object', function() {
            // call generateMessage with two values
            // get response back, store response in variable
        var messageObj = generateMessage("Logan", "I'm hungry!");
        // make assertions:
            // from matches the value that was passed in
        expect(messageObj.from).toBe('Logan');
            // text matches the value that was passed in
        expect(messageObj.text).toBe("I'm hungry!");
            // createdAt is a number
        expect(messageObj.createdAt).toBeA('number');

        // alternative to from/text test --> expect(messageObj).toInclude({from, text});
    });
});
