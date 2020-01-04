
const iCrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends iCrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this._connect()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error('fail!', error)
            return false
        }
    }

   async defineModel() {
        this._herois = driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await herois.sync()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }


    _connect() {
        this._driver = new Sequelize(
            'heroes',
            'douglaslb',
            'my_secret_pw',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
    }
}


module.exports = Postgres