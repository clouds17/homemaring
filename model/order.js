const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    // 下单用户ID
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 预约保姆的ID
    bid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Babysitter'
    },
    // 价格
    price: Number,
    // 下单时间
    currentDate: {
        type: Date,
        default: Date.now()
    },
    // 预约时间
    appTime: String,
    // 备注
    description: String,
    // 0 未完成
    // 1 已完成
    state: Number,
    adress: Number
})

const Order = mongoose.model('Order', orderSchema)

module.exports = {
    Order
}