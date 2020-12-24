const { User } = require('../../../model/user')
const { baseUrl } = require('../../../config/baseUrl')

module.exports = async (req, res) => {
    const { id } = req.params
    let modifyData = {}
    if (req.body.avator === '') {
      modifyData = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile
      }
    } else {
        modifyData = req.body
    }
    const userData = await User.updateOne({_id: id}, modifyData)
    if (userData) {
        return res.json({
            'data': userData,
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