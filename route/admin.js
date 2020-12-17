const express = require('express')
const admin = express.Router()
const passport = require('passport')
// 验证邮箱
admin.get('/checkregister/:email', require('./admin/register/checkregister'))
// 注册
admin.post('/register', require('./admin/register/register'))

// 登录验证
admin.post('/login', require('./admin/login/login'))

// 解析token获取当前用户信息
admin.get('/current', passport.authenticate('jwt', { session: false }), require('./admin/current'))


// 测试
admin.get('/ceshi', require('./admin/ceshi'))

module.exports = admin