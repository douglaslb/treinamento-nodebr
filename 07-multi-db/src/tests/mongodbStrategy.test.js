const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        await context.connect()
    })
    it('Verificar conexão', async() => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })
})