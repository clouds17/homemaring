const { Introduce } = require('../../../model/introduce')
module.exports = async (req, res) => {
    const { id } = req.params
    const introduceData = await Introduce.updateOne({_id: id}, req.body)
    if (introduceData) {
        // 修改成功
        return res.json({
            'data': introduceData,
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