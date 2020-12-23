const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Introduce'
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    content: String,
    link: Number
})