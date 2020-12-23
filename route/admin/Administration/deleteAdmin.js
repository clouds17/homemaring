const { Admin } = require('../../../model/admin')

module.exports = async (req, res) => {
    const { id } = req.params
    const adminData = await Admin.findOneAndDelete({_id: id})
    if (adminData) {
        return res.json({
            'data': adminData,
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