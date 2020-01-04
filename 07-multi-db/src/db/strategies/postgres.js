
const iCrud = require('./interfaces/interfaceCrud')


class Postgres extends iCrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }

}


module.exports = Postgres