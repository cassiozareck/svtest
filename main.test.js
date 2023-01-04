const { connection } = require('./src/sql');
const {signUp, deleteUser, User} = require('./src/user')
  
const deleteTestUser = () => {
    deleteUser('testuser').then((_) => {
        
    }).catch((err) => {})
}

deleteTestUser()

test('Just registering normal user', () => {     
    return signUp('testuser', '123123').then((user) => {
        
        expect(user).toStrictEqual(new User('testuser'));
        
        deleteTestUser()

    }).catch((err) => {throw err})
});    

test('Registering same user', () => {
    return signUp('testuser', '123123').catch(err => {
        throw err
    }).then((_) => {

        signUp('testuser', '123123').catch(err => {
            expect(err).toStrictEqual({error: 'not_available'});
     
            deleteTestUser()
        })
    })
    
});

test('Registering invalid credentials', () => {
    signUp('testuser', '').catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    signUp('    ', '123').catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    signUp('testuser', 123123).catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    signUp('testuser', '  ').catch((err) => {
        expect(err).toStrictEqual({error: 'invalid_credentials'});
    })
    
    // here we dont need to delete testuser as it doesn't even insert
    // into mysql db
});

afterAll(async () => {
    await connection.end()
})

