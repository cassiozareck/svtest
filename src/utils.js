/* ============== FILE MANIPULATION =============== */

'use strict'

const fs = require('fs')
const main = require('./main')

const PATH = '/home/cassio/Desktop/application/json/'
const FILE_ACCOUNTS = PATH + 'accounts.json'
const FILE_USERS = PATH + 'users.json'

createIfNoExists(FILE_ACCOUNTS)
createIfNoExists(FILE_USERS)

// Get a json obj from a given file
function getMapFromJSON(file) {
    let data = fs.readFileSync(file, 'utf-8')
    if (data) {
        return JSON.parse(data)
    }
    return Map()
}

// Add a JSON email and password to a given file without rewriting
// over it
function addToJSONFile(email, passw, file) {

    let data = getMapFromJSON(file)

    data.set(email, passw)

    if (VERBOSE) {
        console.log(`Writing: ${email}, ${passw} into ${file}`)
    }    

    writeToFile(JSON.stringify(data), file)
}

// It do overwrite
function writeToFile(string, file) {
    
    fs.writeFileSync(file, string, err => {
        if (err) console.log(err)
    })
}

function createIfNoExists(file) {
    if (!fs.existsSync(file)) {
        fs.open(file, 'w+', function (err, f) {
            if (err) {
                return console.error(err);
            }})     
    }
}

module.exports = {writeToFile, addToJSONFile, getMapFromJSON, FILE_USERS, FILE_ACCOUNTS}