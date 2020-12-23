const { User } = require('../../../model/user')

module.exports = async (req, res) => {
    const userData = await User.find({ role: 2 })
    if (!userData) {
        res.json({
            "data": null,
            "meta": {
                "status": 400,
                "message": "未找到该保姆"
            }
        })
    }
    res.json({
        "data": userData,
        "meta": {
            "status": 200,
            "message": "查询成功"
        }
    })
}