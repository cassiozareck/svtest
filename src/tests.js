const {signUp,deleteUser} = require('./user') 
deleteUser('testuser').catch((err) => {console.log(err)})
signUp('testuser', '123123').then((user) => {
    
    console.log(user)
}).catch((err) => {console.error(err)})