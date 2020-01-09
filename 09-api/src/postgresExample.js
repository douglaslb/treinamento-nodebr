// npm install sequelize  pg-hstore pg
const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    const herois = driver.define('heroes', {
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
    // await herois.create({
    //     nome: 'Lanterna Verde',
    //     poder: 'Anel'
    // })

    const result = await herois.findAll({raw: true, attributes:['nome']})
    console.log('result', result)
}

main()
