const express = require('express')
const home = express.Router()
const passport = require('passport')

// 验证邮箱
home.get('/checkregister/:email', require('./home/register/checkregister'))
// 注册
home.post('/register', require('./home/register/register'))

// 登录验证
home.post('/login', require('./home/login/login'))

// 获取登录用户信息
home.get('/current', passport.authenticate('jwt', { session: false }), require('./home/current'))
// 获取所有保姆信息
home.get('/renderAll', require('./home/render/renderAll'))

// // 获取单个保姆信息
home.get('/renderOne/:id', require('./home/render/renderOne'))
// // 添加到购物车页面
home.post('/order', passport.authenticate('jwt', { session: false }), require('./home/order/gworder'))

// 测试
home.get('/ceshi', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.render('index')
})

module.exports = home