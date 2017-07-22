var expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');

describe('validate isRealString', function() {
    it('should reject non-string values', function() {
        expect(isRealString(8)).toBe(false);
    });

    it('should reject strings with only spaces', function() {
        expect(isRealString('     ')).toBe(false);
    });

    it('should allow strings with non-space characters to pass', function() {
        expect(isRealString('B')).toBe(true);
    });
});
