const expect = require('expect');
const {Users} = require('./users');

describe('Users', function() {
    var users;
    beforeEach(function() {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Tiffany',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Eisley',
            room: 'Coloring'
        }, {
            id: '3',
            name: 'Amrynn',
            room: 'Node Course'
        }];
    });

    it('should add new user', function() {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Logan',
            room: '1011'
        };
        var responseUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', function() {
        // take the id of one of the seed users
        // pass it to the function removeUser()
        var removedUser = users.removeUser(2);
        // assert that the user was removed.
        expect(users).toExclude({id: 2});
        expect(removedUser).toInclude({id: '2'});
    });

    it('should not remove user', function() {
        var originalUsersLenght = users.length;
        // pass in something that is not an actual user id
        var removedUser = users.removeUser(105);
        // should still have the 3 items in the array after this one.
        expect(users.length).toEqual(originalUsersLenght);
        expect(removedUser).toEqual(undefined);
    });

    it('should find user', function() {
        // pass in a valid id, get the user object back
        var foundUser = users.getUser(2);
        expect(foundUser).toEqual({
            id: '2',
            name: 'Eisley',
            room: 'Coloring'
        });
    });

    it('should not find user', function() {
        // pass in an invalid id
        var foundUser = users.getUser(54);
        // make sure you do not get a user object back.
        expect(foundUser).toEqual(undefined);
    });

    it('should return names for Node Course', function() {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Tiffany', 'Amrynn']);
    });

    it('should return names for Coloring', function() {
        var userList = users.getUserList('Coloring');
        expect(userList).toEqual(['Eisley']);
    });
});
