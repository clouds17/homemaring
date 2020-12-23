const { Admin } = require('../../../model/admin')
module.exports = async (req, res) => {
    const { state, id } = req.params
    const adminData = await Admin.updateOne({_id: id}, {state: state})
    if (adminData) {
        // 修改成功
        return res.json({
            'data': adminData.state,
            'meta': {
                'status': 200,
                'message': '修改成功'
            }
        })
    } else {
        // 修改失败
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '修改失败'
            }
        })
    }
}