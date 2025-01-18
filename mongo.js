const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info(`Server running on port ${config.PORT}`)

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})