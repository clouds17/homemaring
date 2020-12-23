const { User } = require('../../../model/user')

module.exports = async (req, res) => {
    const { id } = req.params
    const userData = await User.findOneAndDelete({_id: id})
    if (userData) {
        return res.json({
            'data': userData,
            'meta': {
                'status': 200,
                'message': '删除成功'
            }
        })
    } else {
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '删除失败'
            }
        })
    }
}