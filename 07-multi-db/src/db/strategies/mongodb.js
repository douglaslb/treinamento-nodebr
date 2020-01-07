
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
        const heroisSchema = new Mongoose.Schema({
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
        this._herois = Mongoose.model('heroes', heroisSchema)
    }

    connect() {
        Mongoose.connect('mongodb://douglaslb:admin@localhost:27017/heroes',
            { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
                if (!error) return;
                console.log('Falha na conexão!', error)
            })

        const connection = Mongoose.connection;
        this.defineModel()

        connection.once('open', () => {
            console.log('Database rodando!');
        })

        this._driver = connection
    }

    create(item) {
        return this._herois.create(item)
    }

    read(item, skip = 0, limit = 10) {
        return this._herois.find(item).skip(skip).limit(limit)
        // return this._herois.count()
    }

    update(id, item) {
        return this._herois.updateOne({ _id: id }, { $set: item });
    }

    delete(id) {
        console.log('id', id)
        return this._herois.deleteOne({_id: id})
    }
}

module.exports = MongoDB