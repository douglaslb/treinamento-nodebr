const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const SENHA = 'douglas@lb23132'
const HASH = '$2b$04$oq5o5RUb.mUNBFgo5HZl.ug1QQ1pNssFXDhy7qnQ9AHbB4ZErHu/q'

describe('UserHelper test suite', function () {
    it('Deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })

    it('Deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})