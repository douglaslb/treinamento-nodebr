/* docker ps 
docker exec -it mongodb mongo -u admin -p admin --authenticationDatabase admin

show dbs 
use heroes
show collections
*/


for (let i = 0; i <= 10000; i++) {
    db.heroes.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '2000-05-07'
    })
}

db.heroes.count()
db.heroes.find().pretty()
db.heroes.findOne()
db.heroes.find().limit(1000).sort({ nome: -1 })
db.heroes.find({}, { poder: 1, _id: 0 })

// CREATE
db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '2000-05-07'
})

// READ
db.heroes.find()

// UPDATE
db.heroes.update({ _id: ObjectId("5e14daba36a527a7d3a8885a") },
                { nome: 'Mulher Maravilha' })

db.heroes.update({ poder: 'Velocidade' },
                {$set: {poder: 'Super Força'}})

// DELETE

db.heroes.remove({})
db.heroes.remove({nome: 'Mulher Maravilha'})



