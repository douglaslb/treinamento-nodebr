
const iCrud = require('./interfaces/interfaceCrud')

class MongoDB extends iCrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}

module.exports = MongoDB