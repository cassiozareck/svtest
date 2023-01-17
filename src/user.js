/* -=============== ACCOUNT AND LOGIN MANAGEMENT */

const {connection} = require('./main')
const sql = require('./sql')

class User {
    constructor(name) {
        this.name = name
    }
}

/**
 * Will register a user 
 * 
 * @param {username} username 
 * @param {password} password 
 * @returns User (if everything goes ok, otherwise Error)
 */
function signUp(username, password) {
    
    return new Promise((resolve, reject) => {
        const res = sql.validateInput(username, password)
        
        if (res.error) {
            console.error(`Invalid input ${username}, ${password}`)
            reject(res)
        }
        
        sql.checkUsernameAvailability(username)
            .then((res) => {
                console.log("reaching here")
                if (res) {
                    console.log(`username: "${username}" available`)
                    
                    // Will register in accounts table
                    sql.registerAtSQL(username, password).catch(
                        (err) => {
                            console.error(err.error)
                            reject(err)

                        }).then((_) => {
                            console.log(`Added: "${username}"`)
                            resolve(getUser(username))
                        })

                } else {
                    console.log("reaching herena")
                    console.error(`Username: ${username} not available`)
                    reject({error: `not_available`})
                }
            }).catch((err) => {
                console.log("reaching hereerr")
                    console.error(err.error)
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

/**
 * Will login a user
 *  
 * @param {username} username 
 * @param {password} password 
 * @returns User (if everything goes ok, otherwise Error)
 */
function login(username, password) {
    return new Promise((resolve, reject) => {
        const validationResult = sql.validateInput(email, passw)

        if (validateInput.error) {
            console.error("Invalid credentials")
            reject(validationResult)
        } 
        
        sql.checkAccount(username, password).then((username) => {
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

module.exports = {signUp, login, deleteUser, User}



