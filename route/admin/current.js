const { Admin } = require('../../model/admin')
const { baseUrl } = require('../../config/baseurl')
module.exports = async (req, res) => {
    const adminData = await Admin.findOne({_id: req.user.id})
    adminData.avator = baseUrl+adminData.avator
    adminData.password = ''
    res.json({"data": adminData, "meta": { "status": 200, "message": "验证成功" }})
}