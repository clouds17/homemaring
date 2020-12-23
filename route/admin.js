const express = require('express')
const admin = express.Router()
const passport = require('passport')
const formidable = require('formidable')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
// 登录验证
admin.post('/login', require('./admin/login/login'))

// 解析token获取当前用户信息
admin.get('/current', passport.authenticate('jwt', { session: false }), require('./admin/current'))

// 添加管理员
admin.post('/addAdmin',passport.authenticate('jwt', { session: false }), require('./admin/Administration/addAdmin'))
// 获取所有管理员信息
admin.get('/allAdmins/:adress',passport.authenticate('jwt', { session: false }), require('./admin/Administration/allAdmins'))

// 修改管理员状态
admin.put('/change/:id/state/:state', passport.authenticate('jwt', { session: false }), require('./admin/Administration/changeState'))

// 修改管理员信息
admin.put('/modifyAdmin/:id', passport.authenticate('jwt', { session: false }), require('./admin/Administration/modifyAdmin'))

// 删除管理员
admin.delete('/deleteAdmin/:id', passport.authenticate('jwt', { session: false }), require('./admin/Administration/deleteAdmin'))

// 查询所以普通用户
admin.get('/allUser/:adress', passport.authenticate('jwt', { session: false }), require('./admin/comsumer/allUser'))
// 修改普通用户
admin.put('/modifyUser/:id', passport.authenticate('jwt', { session: false }), require('./admin/comsumer/modifyUser'))
// 删除普通用户
admin.delete('/deleteUser/:id', passport.authenticate('jwt', { session: false }), require('./admin/comsumer/deleteUser'))
// 测试
admin.get('/ceshi', require('./admin/ceshi'))

module.exports = admin