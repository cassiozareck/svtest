/* 
 *
 * Copyright (c) 2022 - 2023 Snowflake Computing Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * 
 * Author: Cássio Zareck
*/
'use strict'

/* ------------------ DATABASE */
// added in pc
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: '192.168.3.4',
    user: 'remote_user',
    password: 'Sql123123!',
    database: 'books'
})

// Connect to the MySQL server
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

const express = require('express')
const user = require('./user')
const app = express()

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

/* -=============== EXPRESS */

app.get('/', (req, res) => {
    const name = req.query.name
    res.send('Hello World! ' + name)
})

// Define what happens when register data is send through
// post signUp end point
// Necessary keys for request: username, passwd
app.post('/signup', (req, res) => {
    
    console.log(`Request to register user: ${req.query.username}`)

    user.signUp(req.query.username, req.query.passwd).then(user => {
        res.end('Account created')
    }).catch(err => {
        res.status(400).end(`Wasn't possible to sign up: 
                        \n ${err.error}`)
    })

})

// Necessary keys for request: email, passwd
app.post('/login', (req, res) => {

    console.log(`Request to login user: ${req.query.username}`)

    user.login(req.query.username, req.query.passwd).then(user => {
        res.end('Logging made')
    }).catch(err => {
        res.status(400).end(`Wasn't possible to login 
                        \n ${err}`)
    })
})



module.exports = {connection}
