var moment = require('moment');

// Jan 1st 1970 00:00:00 am --> unix standard epoc

var date = moment();
console.log(date.format('MMM Do, YYYY'));
// you can do any number of patterns available at www.momentjs.com
// if you add something like a comma above, it simply prints it out and just gives you that data you have specified

console.log(date.format()); // 2017-07-21T14:15:09-05:00
console.log(date.format('M D Y')); // 7 21 2017
console.log(date.format('MMM Do, YYYY')); // Jul 21st, 2017
console.log(date.format('MMM + Do ! YYYY ?')); // Jul + 21st ! 2017 ?

console.log(date.format('h:mm a'));

// NOTE: in order to pass a specific time to you, you just pass it as an argument to moment()
// var createdAt = 1234;
// var date = moment(createdAt);

// The equivalent to new Date().Time(); is…
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
