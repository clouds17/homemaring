const { Babysitter } = require('../../../model/babysitter')
const { baseUrl } = require('../../../config/baseUrl')
module.exports = async (req, res) => {
    const { email } = req.body
    const isEqual = await Babysitter.findOne({email: email})
    if (!isEqual) {
        // 邮箱可用
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            adress: parseInt(req.body.adress),
            role: parseInt(req.body.role),
            state: parseInt(req.body.state),
            price: parseInt(req.body.price),
            age: parseInt(req.body.age),
            entryTime: req.body.entryTime,
            avator: req.body.avator
        }
        console.log(data)
        const babyData = await Babysitter.create(data)
        if (babyData) {
            // 添加成功
            data.password = ''
            data.avator = baseUrl + data.avator
            return res.json({
                'data': data,
                'meta': {
                    'status': 201,
                    'message': '添加成功'
                }
            })
        } else {
            // 添加失败
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '添加失败'
                }
            })
        }
    } else {
        // 邮箱不可用
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '该邮箱已存在'
            }
        })
    }
}