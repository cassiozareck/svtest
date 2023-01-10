/* 
 * Copyright (c) 2022 - 2023 Snowflake Computing Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * 
 * Author: Cássio Zareck
*/
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const user = require('./user')

const app = express()

const port = 3000

let connected = false

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sql123123!',
    database: 'books'
})

// Connect to the MySQL server
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
    connected = true
});

/* -=============== EXPRESS 
app.get('/', (req, res) => {
    const name = req.query.name
    res.send('Hello World! ' + name)
})

// Define o que acontece quando for enviado dados
// de registro (email e senha)
// Chaves necessárias do request: email, passw
app.post('/signup', (req, res) => {
    let r = user.signUp(req.query.email, req.query.passw)
    if (r == null) {
        res.status(400).end("Wasn't possible to sign up")
    } else {
        res.end('Account created')
    }
})

// Chaves necessárias do request: email, passw
app.post('/login', (req, res) => {
    let r = user.login(req.query.email, req.query.passw)
    if (r == null) {
        res.status(400).end("Wasn't possible to login")
    } else {
        res.end(JSON.stringify(r))
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
*/
module.exports = {connection, connected}