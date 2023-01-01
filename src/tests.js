
const {VERBOSE} = require('./main')
const {connection} = require('./sql')

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
    checkUsernameAvailability(username)
        .then((res) => {
            if (res) {
                if (VERBOSE) {
                    console.log(`username: "${username}" available`)
                }    
                registerAtSQL(username, password).catch(
                    (err) => {
                        console.error(err)
                    }).then((rows) => {
                        if (VERBOSE) {
                            console.log(`Added: "${rows}"`)
                        }
                    })
            } else {
                if (VERBOSE) {
                    console.error(`username: ${username} not available`)
                    return {error: `username: ${username} not available`}
                }
            }
        }).catch((err) => {
                console.error(err)
                return {error: err}
            })
}
signUp('cassio', 123123)



