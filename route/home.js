const express = require('express')
const home = express.Router()
const passport = require(passport)


// 下单页面
home.post('/order', passport.authenticate('jwt', { session: false }), require('./home/order/gworder'))