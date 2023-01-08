'use strict';

const {deleteUser, signUp, login} = require('./src/user')
const main = require('./src/main')
const mysql = require('mysql-mock');

// Create a new MySQL mock database
const db = mysql.createConnection();

// Define the schema for the database
db.schema({
  accounts: {
    id: { type: 'increments', primary: true },
    username: { type: 'string', maxlength: 150, unique: true},
    password: { type: 'string', maxlength: 254}
  }
});

// Insert some rows into the 'users' table
db.table('accounts').insert([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
  { name: 'Charlie', email: 'charlie@example.com' }
]);

// Query the 'users' table
const users = db.table('users').select();

// Mock so we dont need to connect to SQL
main.connection = db

test('Just registering normal user', () => { 
    signUp('testuser', '123123').then((user) => {
        expect(user).toStrictEqual(new User('testuser'));
    }).catch((err) => {throw err})
});    

test('Registering same user', () => {
    signUp('Charlie', '123123').catch(err => {
        expect(err).toStrictEqual({error: 'not_available'});
    })
})

test('Registering invalid credentials', () => {
    signUp('testuser', '').catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    signUp('    ', '123').catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    signUp('testuser', 123123).catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    signUp('testuser', '  ').catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    
});

test('Log in newly created user', () => {
    signUp('DarkNight', '123123').then((_) => {
        login('DarkNight', '123123').then((username) => {
            expect(username).toStrictEqual('DarkNight');
        }).catch(() => {})
    }).catch(() => {})
})

