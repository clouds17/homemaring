const { Babysitter } = require('../../../model/babysitter')
module.exports = async (req, res) => {
    const { id } = req.params
    const babysitterData = await Babysitter.findOneAndDelete({_id: id})
    if (babysitterData) {
        // 删除成功
        return res.json({
            'data': null,
            'meta': {
                'status': 200,
                'message': '删除成功'
            }
        })
    } else {
        // 删除失败
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '删除失败'
            }
        })
    }
}