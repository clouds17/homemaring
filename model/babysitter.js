const mongoose = require('mongoose')
const babysitterSchema = new mongoose.Schema({
    avator: String,
    username: {
        type: String,
        required: true,
        minlength: [2, '用户名最小长度为2个字符'],
        maxlength: [10, '用户名最大长度为10个字符']
    },
    email: String,
    password: {
        type: String,
        required: true,
        minlength: [6, '密码长度最小为6个字符'],
        maxlength: [15, '密码长度最大为15个字符']
    },
    mobile: Number,
    /* 
     * adress
     * 漳州编码： 363000
     * 厦门编码： 361000
     * 福州编码： 350000 
     */
    adress: Number,
    /**
     * role
     * 住家保姆：1
     * 月嫂：2
     * 临时工：3
     * 护工：4
     * 育儿嫂：5
     */
    role: Number,
    /**
     * state
     * 空闲：1
     * 忙碌：2
     * 休息：3
     */
    state: Number,
    // 一次的价格
    price: Number,
    // 入职时间
    entryTime: Date,
    age: Number
})

const Babysitter = mongoose.model('Babysitter', babysitterSchema)

module.exports = {
    Babysitter
}