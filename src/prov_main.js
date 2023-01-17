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
// Necessary keys for request: username, passw
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

