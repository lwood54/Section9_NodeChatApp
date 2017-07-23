const _ = require('lodash');

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// creating a class with ES6
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }
//
// var me = new Person('Logan', 35);
// var description = me.getUserDescription();
// console.log(description);
class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        // return user that was removed
        var removedUser;
        var foundUserIndex = _.findIndex(this.users, function(user) {
            return user.id === id.toString();
        });
        if (foundUserIndex > -1) {
            removedUser = this.users.splice(foundUserIndex, 1);
            return removedUser[0];
        } else {
            return removedUser;
        }
    }
    getUser(id) {
        var user = this.users.filter(function(user) {
            return user.id === id.toString();
        });
        return user[0];
    }
    getUserList(room) {
        var users = this.users.filter(function(user) {
            return user.room === room;
        });
        var namesArray = users.map(function(user) {
            return user.name;
        });
        return namesArray;
    }
}

module.exports = {
    Users
};
