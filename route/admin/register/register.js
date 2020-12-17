const { User } = require('../../../model/user')
const formidable = require('formidable')
const path = require('path')
const { baseUrl } = require('../../../config/baseurl')
module.exports = (req, res) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, '../', '../', '../', 'public', 'upload')
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        // err 存储错误对象,正确时为null
        // fields存储普通请求参数
        // files存储上传文件信息
        if (err == null) {
                const data = {
                    username: fields.username,
                    password: fields.password,
                    email: fields.email,
                    mobile: parseInt(fields.mobile),
                    adress: parseInt(fields.adress),
                    avatar: files.avatar.path.split('public')[1],
                    role: 0
                }
                await User.create(data)
                const obj = {
                    "data": data,
                    "meta": {
                        "status": 200,
                        "message": "注册成功"
                    }
                }
                obj.data.avatar = baseUrl+files.avatar.path.split('public')[1]
                res.json(obj)
        } else {
            const obj = {
                "data": null,
                "meta": {
                    "status": 400,
                    "message": "注册失败"
                }
            }
            res.json(obj)
        }
    })
}
