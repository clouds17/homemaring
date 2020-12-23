const { Admin } = require('../../../model/admin')
const path = require('path')
// const formidable = require('formidable')
const { baseUrl } = require('../../../config/baseurl')
module.exports = async (req, res) => {
    const { email } = req.body
    const isEqual = await Admin.findOne({email: email})
    if (!isEqual) {
       // 邮箱可用
       const data = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            mobile: parseInt(req.body.mobile),
            adress: parseInt(req.body.adress),
            role: parseInt(req.body.role),
            state: req.body.state,
            avator: req.body.avator
       }
       const adminData = await Admin.create(data)
        if (adminData) {
            // 添加成功
            data.avator = baseUrl+data.avator
            data.password = ''
            res.json({
                'data': data,
                'meta': {
                    'status': 201,
                    'message': '创建成功'
                }
            })
        } else {
            res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '创建失败'
                }
            })
        }
    } else {
        // 该邮箱已经存在
        res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '该邮箱已存在'
            }
        })
    }
    
}