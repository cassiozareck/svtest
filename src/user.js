/* -=============== ACCOUNT AND LOGIN MANAGEMENT */
'use strict'
const {connection} = require('./sql')

class User {
    constructor(name) {
        this.name = name
    }
}

function validateInput(username, passw) {
    // Validate input arguments
    if (typeof username !== 'string' || username.trim().length === 0) {
        return { error: 'invalid_credentials'};
    }
    if (typeof passw !== 'string' || passw.trim().length === 0) {
        return { error: 'invalid_credentials'};
    }
    return {}
}

const checkUsernameAvailability = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT username FROM accounts WHERE username = "${username}"`,
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows.length === 0)
                }
            }
            )
    })
}

function registerAtSQL(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO accounts (username, password) VALUES ("${username}",
                                                 "${password}")`,
            (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }}
                )
            }
            )
}

function signUp(username, password) {
    return new Promise((resolve, reject) => {
        const res = validateInput(username, password)
        
        if (res.error) {
            console.error('Invalid input')
            reject(res)
        }

        checkUsernameAvailability(username)
            .then((res) => {
                if (res) {
                    console.log(`username: "${username}" available`)
                    
                    registerAtSQL(username, password).catch(
                        (err) => {
                            console.error(err)
                            reject(err)
                        }).then((rows) => {
                            console.log(`Added: "${username}"`)
                            resolve(getUser(username))
                        })

                } else {
                    console.error(`Username: ${username} not available`)
                    reject({error: `not_available`})
                }
            }).catch((err) => {
                    console.error(err)
                    reject(err)
                })
        })
}

function deleteUser(username) {
    /* When we're making a query it will return a query object and not a 
    promisse, that means, as query is async, we need to return Promise so
    the caller function can assign a function will be called when query
    returns row sucessfuly or an callback for error*/
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM accounts WHERE username = "${username}"`,
            (err, row) => {
                if (err) {
                    console.error(err)
                    reject(err)   
                } else {
                    if (row.affectedRows === 0) {
                        console.error(`User not found: `, username)
                        reject({error: 'User not found'})
                    } else {
                        resolve(row)
                    }
                }
                })
    })
}

function getUser(username) {
    return new User(username)
}

function checkAccount(email, passw, accounts) {
    if (accounts[email] === passw) {    
        console.log('Found account')
        console.log('Logging in user: ' + email + 
                    'with password: '+ passw)
        
        return searchUser(email)
    } 

    // Return error if no matching account is found
    return { error: 'Email or password is incorrect' };
}

function login(email, passw) {
    const validationResult = validateInput(email, passw)
    if (validateInput.error) {
        
        console.log(validateInput.error)
    
        return validationResult
    }

    // Get list of accounts
    const accounts = getMapFromJSON(FILE_ACCOUNTS);

    return checkAccount(email, passw, accounts)
}

// Search for an user using email
function searchUser(email) {
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            console.log('Found user: ' + users[i].email) 
                
            return new User(users[i].name, users[i].email)
        }}
    
    throw Error('Email not found')
}

module.exports = {signUp, login, deleteUser, User}