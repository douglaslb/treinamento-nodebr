
const iCrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const status = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando'
}
class MongoDB extends iCrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {
        const state = status[this._driver.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000))

        return status[this._driver.readyState]
    }

    defineModel() {
        heroisSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date
            }
        })

        this._herois = Mongoose.model('heroi', heroisSchema)
    }

    connect() {
        Mongoose.connect('mongodb://douglaslb:admin@localhost:27017/heroes',
            { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
                if (!error) return;
                console.log('Falha na conexão!', error)
            })

        const connection = Mongoose.connection;
        connection.once('open', () => {
            console.log('Database rodando!');
        })

        this._driver = connection
    }

    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Batman',
            poder: 'Dinheiro'
        })
        console.log('result cadastrar', resultCadastrar)
    }
}

module.exports = MongoDB