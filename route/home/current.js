const { User } = require('../../model/user')
const { baseUrl } = require('../../config/baseurl')
module.exports = async (req, res) => {
    const userData = await User.findOne({_id: req.user.id})
    userData.avator = baseUrl+userData.avator
    userData.password = ''
    res.json({"data": userData, "meta": { "status": 200, "message": "验证成功" }})
}