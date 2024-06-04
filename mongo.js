const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('no argument given.')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://japneet:${password}@fullstackopen.sr2wqpd.mongodb.net/?retryWrites=true&w=majority&appName=Fullstackopen`

const shouldRead = process.argv.length === 3 ? true : false

if (!shouldRead && process.argv.length !== 5) {
    console.log('invalid arguments for saving person on phonebook.')
    process.exit(1)
}

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    if (shouldRead) {
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(p => {
                console.log(p.name, p.number)
            })
            mongoose.connection.close()
        })
    } else {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })
        person.save().then(result => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
    }
})