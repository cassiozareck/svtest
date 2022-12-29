/* -=============== ACCOUNT AND LOGIN MANAGEMENT */
'use strict'

const utils = require('./utils')
const jh = new utils.JSONHandler()

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
    let accounts = jh.getAccountsList()
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
    let users = jh.getUsersList()
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            return new User(users[i].name, users[i].email)
        }}
    throw Error('Email not found')
}

// Such a function will create an account and store it in FILE_ACCOUNT
// and also create new user
function signUp(email, passw) {
    let accounts = jh.getAccountsList()    
    
    // If account does not exists
    if (accounts.indexOf(email) == -1) {
        jh.addToJSONAccounts({email: email, password: passw})
        
        let username = email.substring(0, email.indexOf('@'));
        let user = {
            name: username,
            email: email
        }
        
        jh.addToJSONUsers(user)

        return true
    }
    return null
}

module.exports = {login, signUp}