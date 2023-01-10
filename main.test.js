'use strict'

const user = require("./src/user")
const sql = require("./src/sql")
const tests = require("./src/tests")


/* Mock so we dont need to connect to database */
const dbAcc = [
    {username: 'alice', password: '123123'},
    {username: 'pedro', password: '321321'},
    {username: 'Ariel', password: 'm022'},
]

sql.registerAtSQL = jest.fn((username, password) => {
    
    return new Promise((resolve, reject) => {
        dbAcc.push({username, password})
        resolve(username)
    })
})

sql.checkUsernameAvailability = jest.fn((uname) => {
    console.log("WHY'RE SO OBSSEDED")
    return new Promise((resolve, reject) => {
        dbAcc.forEach((username, _) => {
            
            if (username === uname) {
                resolve(true)
            }  
        })        
        resolve(true)
    })
})

sql.deleteUser = jest.fn((uname) => {
    return new Promise((resolve, reject) => {
        const index = dbAcc.indexOf(uname);

        if (index > -1) {
            dbAcc.splice(index, 1);
            resolve()
        } else {
            reject({error: 'user_not_found'})
        }
    })
})

user.signUp = jest.fn(user.signUp)
user.login = jest.fn(user.login)


/**
 * The aim of this function is to reset mock counters such as
 * how much called the function was
 */
function clearMocks() {
    sql.registerAtSQL.mockClear()
    sql.checkUsernameAvailability.mockClear()
    user.signUp.mockClear()
    user.login.mockClear()
}

test('Just registering normal user', async () => { 
    
    await user.signUp('testuser', '123123').then((user) => {
        expect(user).toEqual(new User('testuser'));
    }).catch((err) => {console.error(err)})

    expect(sql.registerAtSQL).toBeCalledTimes(1)
    expect(sql.checkUsernameAvailability).toBeCalledTimes(1)
    expect(user.signUp).toBeCalledTimes(1)

    clearMocks()
});    

test('Registering same user', async () => {
    await user.signUp('alice', '123123').catch(err => {
        expect(err).toEqual({error: 'not_available'});
    })

    expect(sql.checkUsernameAvailability).toBeCalledTimes(1)
    expect(user.signUp).toBeCalledTimes(1)
    
    clearMocks()
})

test('Registering invalid credentials', async () => {
    await user.signUp('testuser', '').catch((err) => {
        expect(err).toEqual({error: 'invalid_credentials'});
    })
    await user.signUp('    ', '123').catch((err) => {
        expect(err).toEqual({error: 'invalid_credentials'});
    })
    await user.signUp('testuser', 123123).catch((err) => {
        expect(err).toEqual({error: 'invalid_credentials'});
    })
    await user.signUp('testuser', '  ').catch((err) => {
        expect(err).toEqual({error: 'invalid_credentials'});
    })

    expect(user.signUp).toBeCalledTimes(4)
    clearMocks()
});

test('Log in newly created user', async () => {
    await user.signUp('DarkNight', '123123').then((_) => {
        user.login('DarkNight', '123123').then((username) => {
            expect(username).toEqual('DarkNight');
        }).catch(() => {})
    }).catch(() => {})

    expect(user.signUp).toBeCalledTimes(1)
    expect(user.login).toBeCalledTimes(1)

    clearMocks()
})

