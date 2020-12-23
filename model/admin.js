const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [2, '用户名不能小于2个字符'],
        maxlength: [10, '用户名不能大于10个字符']
    },
    email: String,
    password: {
        type: String,
        required: true,
        minlength: [6, '密码长度最小为6个字符'],
        maxlength: [15, '密码长度最大为15个字符']
    },
    mobile: Number,
    /**
     * adress
     * 漳州363000
     * 厦门361000
     * 福州350000
     */
    adress: Number,
    /**
     * role
     * 经理：1
     * 主管：2
     * 组长：3
     */
    role: Number,
    avator: String,
    /**
     * state
     * 控制启用禁用
     * 禁用：0
     * 启用：1
     */
    state: Boolean
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = {
    Admin
}