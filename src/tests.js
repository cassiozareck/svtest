// const {signUp, checkUsernameAvailability} = require('./user')
/* Deixei marcado está linha acima para que me lembre de um erro que 
 * custou dias para ser resolvido. Você vê o erro?
 * Quando fazemos isso, impedimos o arquivo de utilizar mocks ao invés
 * da implementação original. Por isso, devemos importar arquivos inteiros
 * ao invés de só funções necessárias, e, também, utilizar por extensos 
 * as funções do arquivo importado, como: user.signUp() ao invés de signUp()
 */

/*const user = require('./user') //  LEMBRE-SE BEM DISSO

function test() {
    user.checkUsernameAvailability('cassio').then(console.log(this))
}
module.exports = {test}
*/