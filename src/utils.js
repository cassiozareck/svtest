/* ============== FILE MANIPULATION =============== */

'use strict'

const fs = require('fs')

const PATH = '/home/cassio/Desktop/application/json/'
const FILE_ACCOUNTS = PATH + 'accounts.json'
const FILE_USERS = PATH + 'users.json'

// Get a json obj from a given file
function getArrFromJSON(file) {
    let data = 
    fs.readFileSync(file, 'utf-8')
    if (data) {
        return JSON.parse(data)
    }
    return []
}

// Add a JSON object to given file without rewriting
// over it
function addToJSONFile(obj, file) {
    let data = getArrFromJSON(file)
    data.push(obj)
    writeToFile(JSON.stringify(data), file)
}

class JSONHandler {

    constructor() {        
        createIfNoExists(FILE_ACCOUNTS)
        createIfNoExists(FILE_USERS)
    }

    // Basically it will add an user object into json file
    addToJSONUsers(obj) {
        addToJSONFile(obj, FILE_USERS)
    }    
    
    // Same as addToJSONUsers but for accounts
    addToJSONAccounts(obj) {
        addToJSONFile(obj, FILE_ACCOUNTS)
    }    

    // Clean both files
    clean() {
        writeToFile('', FILE_ACCOUNTS)
        writeToFile('', FILE_USERS)
    }

    // Will return an array of objects from the json file
    getAccountsList() {
        return getArrFromJSON(FILE_ACCOUNTS)
    }

    getUsersList() {
        return getArrFromJSON(FILE_USERS)
    }
}

function createIfNoExists(file) {
    if (!fs.existsSync(file)) {
        function createFile(file) {
            fs.open(file, 'w+', function (err, f) {
                if (err) {
                    return console.error(err);
                }})
        }        
    }
}

// It do overwrite
function writeToFile(string, file) {
    fs.writeFileSync(file, string, err => {
        if (err) console.log(err)
    })
}

module.exports = {JSONHandler}