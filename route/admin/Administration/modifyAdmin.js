// 修改管理员信息页面
const { Admin } = require('../../../model/admin')
const { baseUrl } = require('../../../config/baseurl')
// const formidable = require('formidable')
const path = require('path')
module.exports = async (req, res) => {
    const { id } = req.params
    let modifyData = {}
    if (req.body.avator === '') {
        modifyData = {
            username: req.body.username,
            email: req.body.email,
            mobile: parseInt(req.body.mobile),
            role: parseInt(req.body.role)
        }
    } else {
        modifyData = req.body
    }
    const adminData = await Admin.updateOne({_id: id}, modifyData)
        if (adminData) {
            modifyData.password = ''
            modifyData.avator = baseUrl + modifyData.avator
            return res.json({
                'data': modifyData,
                'meta': {
                    'status': 200,
                    'message': '修改成功'
                }
            })
        } else {
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '修改失败'
                }
            })
        }
}