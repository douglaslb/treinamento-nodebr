const assert = require('assert')
const api = require('./../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UserSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}

const USER = {
    username: 'douglaslb',
    password: '123'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$fY95GPE8x4pIRk8saHixeORU3XD9fFcqUliN8YCCAicj7EDoLzxUG'
}

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UserSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        await postgres.update(null, USER_DB, true)
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)


        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

    it('Deve retornar não autorizado ao tentar obter um login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'douglas',
                password: '321'
            }
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized")
    })
})