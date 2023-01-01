/*const hello = require("./hello")
const fs = require('fs')

test('Basic test: Do sign up worked?', () => {
    hello.clean(hello.FILE_ACCOUNTS)
    expect(hello.signUp('cassio', '123123')).toBe(!null)
})

test('Basic test: Login at new user', () => {
    hello.clean(hello.FILE_ACCOUNTS)
    hello.signUp('alice', '1123')
    expect(hello.login('alice', '1123')).toBe(!null)
})

test('Basic test: Login at non-existent user', () => {
    hello.clean(hello.FILE_ACCOUNTS)
    expect(hello.login('ace', '123')).toBe(null)
})

let file = 'test.txt'
test('Basic test: Open and write to file', () => {
    hello.createFile(file)
    hello.writeToFile('asdsadasd', file)
    expect(fs.readFileSync(file, 'utf-8')).toBe('asdsadasd')
})

test('Basic test: Clean file', () => {
    hello.clean(file)
    expect(fs.readFileSync(file, 'utf-8')).toBe('')
    fs.unlinkSync(file)           // Remover arquivo  
})


*/