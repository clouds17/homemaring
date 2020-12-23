//保姆申请表
const mongoose = require('mongoose')
const applySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [2, '用户名最小长度为2个字符'],
        maxlength: [10, '用户名最大长度为10个字符']
    },
    age: Number,
    /**
     * gender
     * 女：0
     * 男：1
     */
    gender: Number,
    email: String,
    mobile: String,
    /**
     * 申请类型
     * role
     * 住家保姆：1
     * 月嫂：2
     * 临时工：3
     * 护工：4
     * 育儿嫂：5
     */
    role: Number,
    selfIntroduction: String,
    /**
     * state
     * 0：待审核（主管审核，同意后为1发送给经理）
     * 1：审核（经理审核，同意后去添加该保姆账号信息）
     * 2：审核通过
     * -1：驳回
     */
    state: Number,
    // 申请时间
    applyDate: Date
})