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

// Clean a file
function clean(file) {
    writeToFile('', file)
}

/* -=============== ACCOUNT AND LOGIN MANAGEMENT */
class User {
    constructor(name) {
        this.name = name
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
        if (accounts[i].user == email && 
            accounts[i].password == passw) {
                return User(accounts[i].user)
            }
    }   
    return null
}

// Such a function will create an account and store it in FILE_ACCOUNT
function signUp(email, passw) {
    let accounts = getObj(FILE_ACCOUNTS)    
    
    // If account does not exists
    if (accounts.indexOf(email) == -1) {
        accounts.push({user: email, password: passw})
        
        const string = JSON.stringify(accounts)
        writeToFile(string, FILE_ACCOUNTS)
        return true
    }
    return null
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
    signUp(req.body.email, req.body.passw)
    res.send('post ' + req.query.email)
    console.log(req.query.email)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

module.exports = {FILE_ACCOUNTS, signUp, clean, login, getObj, 
    createFile, writeToFile}
