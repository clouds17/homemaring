const { Admin } = require('../../../model/admin')
const jwt = require('jsonwebtoken')
const keys = require('../../../config/keys')
const { baseUrl } = require('../../../config/baseurl')
const admin = require('../../admin')

module.exports = async (req, res) => {
    const { email, password } = req.body
    const adminData = await Admin.findOne({email: email})
    if (adminData) {
        // 邮箱正确
        if (password != adminData.password) {
            return res.json({
                "data": null,
                "meta": { "status": 400, "message": "密码不正确" }
            })
        }
        // 验证该账号是否启用
        if (!adminData.state) {
            // 禁用状态
            return res.json({
                'data': null,
                'meta': {
                    'status': 401,
                    'message': '该账号未启用'
                }
            })
        }
        // 设置规则
        const rule = { 
            id: adminData._id, 
            email: adminData.email, 
            username: adminData.username, 
            adress: adminData.adress,
            role: adminData.role,
            mobile: adminData.mobile,
            avator: baseUrl+adminData.avator,
            state: adminData.state
        }
        // 设置token
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 60*60*24 }, (err, token) => {
            if (err) throw err
            return res.json({
                "data": {
                    "token": "Bearer "+token,
                    "adress": adminData.adress,
                    "role": adminData.role,
                    "id": adminData._id,
                    "username": adminData.username,
                    "email": adminData.email,
                    "mobile": adminData.mobile
                },
                "meta": {
                    "status": 200,
                    "message": "登录成功"
                }
            })
        })
    } else {
        // 邮箱不正确
        return res.json({
            "data": null,
            "meta": { "status": 400, "message": "邮箱不正确" }
        })
    }
}
