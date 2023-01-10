/* -=============== ACCOUNT AND LOGIN MANAGEMENT */

'use strict'
const {connection} = require('./main')

class User {
    constructor(name) {
        this.name = name
    }
}

/*
 * Will of course verify if username or password isnt empty
 * or isnt a string
 */
function validateInput(username, password) {
    // Validate input arguments
    if (typeof username !== 'string' || username.trim().length === 0) {
        return { error: 'invalid_credentials'};
    }
    if (typeof password !== 'string' || password.trim().length === 0) {
        return { error: 'invalid_credentials'};
    }
    return {}
}

/*
 * This function will check if isnt a created account
 * with the given username argument. It returns a promise of 
 * course because it is a sql call (async)
 */
function checkUsernameAvailability(username) {
   
    return new Promise((resolve, reject) => {
       
        connection.query(
            `SELECT username FROM accounts WHERE username = "${username}"`,
            (err, rows) => {
                if (err) {  // if the SQL call get an error
                    reject(err)
                } else {
                    resolve(rows.length === 0) // true if it doesn't exist
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
                    
                    // Will register in accounts table
                    registerAtSQL(username, password).catch(
                        (err) => {
                            console.error(err)
                            reject(err)

                        }).then((_) => {
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
                    if (row.affectedRows === 0) { // It means nothing changed at all

                        console.error(`User not found: `, username)
                        reject({error: 'user_not_found'})

                    } else {
                        resolve(row)
                    }
                }
                })
    })
}

/*
 * Will check there is an account that match both username and
 * password  
 */
function checkAccount(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE username =
                 '${username}' AND password = '${password}';
        `, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                if (rows.length === 0) {
                    reject({error: 'not_found'})
                } else {
                    resolve(username)
                }
            }       
        })
    })
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        const validationResult = validateInput(email, passw)

        if (validateInput.error) {
            console.error("Invalid credentials")
            reject(validationResult)
        } 
        
        checkAccount(username, password).then((username) => {
            console.log('Found account')
            console.log('Logging in user: ' + username + 
                        'with password: '+ password)
            resolve(getUser(username))
        })
    })
}

/*
 * Its an incomplete function by now
 * but its okay since we doesnt
 * implemented any user information 
 * except name and password
 * TODO
 */
function getUser(username) {
    return new User(username)
}

module.exports = {signUp, login, deleteUser, checkUsernameAvailability, 
    checkAccount, validateInput, registerAtSQL, User}



