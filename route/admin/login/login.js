const { User } = require('../../../model/user')
const jwt = require('jsonwebtoken')
const keys = require('../../../config/keys')
const { baseUrl } = require('../../../config/baseurl')

module.exports = async (req, res) => {
    const { email, password } = req.body
    const userData = await User.findOne({email: email})
    if (userData) {
        // 邮箱正确
        if (password != userData.password) {
            return res.json({
                "data": null,
                "meta": { "status": 400, "message": "密码不正确" }
            })
        }
        // 设置规则
        const rule = { 
            id: userData._id, 
            email: userData.email, 
            username: userData.username, 
            adress: userData.adress,
            role: userData.role,
            mobile: userData.mobile,
            avatar: baseUrl+userData.avatar
        }
        // 设置token
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 60*60*24 }, (err, token) => {
            if (err) throw err
            return res.json({
                "data": {
                    "token": "Bearer "+token,
                    "adress": userData.adress,
                    "role": userData.role,
                    "id": userData._id,
                    "username": userData.username,
                    "email": userData.email,
                    "mobile": userData.mobile
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
