const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

const port = 3000
const FILE_ACCOUNTS = 'accounts.json'
const FILE_USERS = 'users.json'


/* -============== FILE MANIPULATION */
// Will open necessary files if it doesn't exist
function createFile(file) {
    fs.open(file, 'w+', function (err, f) {
        if (err) {
            return console.error(err);
        }})
}

function createIfNoExists(file) {
    if (!fs.existsSync(file)) {
        createFile(file)
    }
}
createIfNoExists(FILE_ACCOUNTS)
createIfNoExists(FILE_USERS)

function writeToFile(string, file) {
    fs.writeFileSync(file, string, err => {
        if (err) console.log(err)
    })
}

// Get a json obj from a given file
function getObj(file) {
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
    let data = getObj(file)
    data.push(obj)
    writeToFile(JSON.stringify(data), file)
}

// Clean a file
function clean(file) {
    writeToFile('', file)
}

/* -=============== ACCOUNT AND LOGIN MANAGEMENT */
class User {
    constructor(name, email) {
        this.name = name
        this.email = email
    }
}

// Transforma o arquivo de contas em um obj
// JavaScript e itera sobre eles para ver
// a qual conta pertence
// Se o email e senha forem igual deve
// retornar um usuário
function login(email, passw) {
    let accounts = getObj(FILE_ACCOUNTS)
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email == email && 
            accounts[i].password == passw) {
                return searchUser(accounts[i].email)
            }
    }   
    return null
}

// Search for an user using email
function searchUser(email) {
    let users = getObj(FILE_USERS)
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return new User(users[i].name, users[i].email)
        }}
    throw Error('Email not found')
}

// Such a function will create an account and store it in FILE_ACCOUNT
// and also create new user
function signUp(email, passw) {
    let accounts = getObj(FILE_ACCOUNTS)    
    
    // If account does not exists
    if (accounts.indexOf(email) == -1) {
        accounts.push({email: email, password: passw})
        
        const string = JSON.stringify(accounts)
        writeToFile(string, FILE_ACCOUNTS)
        
        createNewUser(email)

        return true
    }
    return null
}

// Will create a new user and stores it at users.json
function createNewUser(email) {
    let username = email.substring(0, email.indexOf('@'));
    let user = {
        name: username,
        email: email
    }
    addToJSONFile(user, FILE_USERS)
    return true
}

/* -=============== EXPRESS */
app.get('/', (req, res) => {
    const name = req.query.name
    res.send('Hello World! ' + name)
})

// Define o que acontece quando for enviado dados
// de registro (email e senha)
// Chaves necessárias do request: email, passw
app.post('/signup', (req, res) => {
    let r = signUp(req.query.email, req.query.passw)
    if (r == null) {
        res.status(400).end("Wasn't possible to sign up")
    } else {
        res.end('Account created')
    }
})

// Chaves necessárias do request: email, passw
app.post('/login', (req, res) => {
    let r = login(req.query.email, req.query.passw)
    if (r == null) {
        res.status(400).end("Wasn't possible to login")
    } else {
        res.end(JSON.stringify(r))
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

module.exports = {FILE_ACCOUNTS, signUp, clean, login, getObj, 
    createFile, writeToFile}
