const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '请填写用户名'],
        minlength: [2, '用户名最小长度为2个字符'],
        maxlength: [10, '用户名最大长度为10个字符']
    },
    email: {
        type: String,
        required: [true, '请填写邮箱']
    },
    password: {
        type: String,
        required: [true, '请填写密码']
    },
    mobile: {
        type: Number,
        required: [true, '请填写手机号']
    },
    /* 
     * adress
     * 漳州编码： 363000
     * 厦门编码： 361000
     * 福州编码： 350000 
     */
    adress: {
        type: Number,
        required: true
    },
    avator: String,
    registerDate: Date
    
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}