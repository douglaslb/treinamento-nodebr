const Mongoose = require('mongoose')
Mongoose.connect('mongodb://douglaslb:admin@localhost:27017/heroes',
    { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (!error) return;
        console.log('Falha na conexão!', error)
    })


const connection = Mongoose.connection;
connection.once('open', () => {
    console.log('Database rodando!', connection.readyState);
});

/*
    0: Disconectado
    1: Conectado
    2: Conectando
    3: Disconectando
*/

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

const model = Mongoose.model('heroi', heroisSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItems = await model.find()
    console.log('items', listItems)
}  

main()