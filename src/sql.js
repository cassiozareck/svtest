
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


/*
 * Will check there is an account that match both username and
 * password  
 */
function checkAccount(username, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE username =
                 '${username}' AND password = '${password}';`,
                  (err, rows) => {
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

module.exports = {checkAccount, checkUsernameAvailability, 
                registerAtSQL, validateInput}