'use strict';

const user = require('./src/user')

/* Mock so we dont need to connect to database */
const dbAcc = [
    {username: 'alice', password: '123123'},
    {username: 'pedro', password: '321321'},
    {username: 'Ariel', password: 'm022'},
]

user.registerAtSQL = jest.fn((username, password) => {
  
    return Promise((resolve, reject) => {
        dbAcc.push({username, password})
        resolve(username)
    })
})


user.checkUsernameAvailability = jest.fn((uname) => {
  
    return Promise((resolve, reject) => {
        dbAcc.forEach((username, _) => {
            if (username === uname) {
                resolve(false)
            }  
        })        
        resolve(true)
    })
})

user.deleteUser = jest.fn((uname) => {

    return Promise((resolve, reject) => {
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
user.login = jest.fn(user.signUp)

test('Just registering normal user', async () => { 

    await user.signUp('testuser', '123123').then((user) => {
        expect(user).toStrictEqual(new User('testuser'));
    }).catch((err) => {throw err})

    expect(user.registerAtSQL).toEqual(1)
    expect(user.checkUsernameAvailability).toEqual(1)
    expect(user.signUp).toEqual(1)

});    

test('Registering same user', async () => {
    await user.signUp('alice', '123123').catch(err => {
        expect(err).toEqual({error: 'not_available'});
    })

    expect(user.checkUsernameAvailability).toBeCalledTimes(1)
    expect(user.signUp).toEqual(1)
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
});

test('Log in newly created user', async () => {
    await user.signUp('DarkNight', '123123').then((_) => {
        user.login('DarkNight', '123123').then((username) => {
            expect(username).toEqual('DarkNight');
        }).catch(() => {})
    }).catch(() => {})

    expect(user.signUp).toBeCalledTimes(1)
    expect(user.login).toBeCalledTimes(1)
})

