const mongoose = require('mongoose')
const skillSchema = new mongoose.Schema({
    id: String,
    authName: String,
    children: String
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = {
    Skill
}