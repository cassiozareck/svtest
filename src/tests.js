const { deleteUser, signUp } = require('./user')

deleteUser('cassioz').catch( (err) => { 
    console.log(err)
})
signUp('cassioz', "123123").then((user) => {
    console.log(user.name)
})
