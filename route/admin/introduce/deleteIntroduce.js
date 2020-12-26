const { Introduce } = require('../../../model/introduce')
const { Babysitter } = require('../../../model/babysitter')

module.exports = async (req, res) => {
    const { id, bid } = req.params
    const introduceData = await Introduce.findOneAndDelete({_id: id})
    if (introduceData) {
        // 删除成功
        const babyData = await Babysitter.updateOne({_id: bid}, {isArticle: false})
        return res.json({
            'data': babyData,
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