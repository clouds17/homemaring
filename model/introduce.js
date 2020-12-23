const mongoose = require('mongoose')
const introduceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, "标题长度最小为2个字符"],
        maxlength: [20, "标题长度最大为20个字符"]
    },
    bid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Babysitter'
    },
    pics: String,
    content: String,
    link: Number
})

const Introduce = mongoose.model('Introduce', introduceSchema)

module.exports = {
    Introduce
}