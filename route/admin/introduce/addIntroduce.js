const { Introduce } = require('../../../model/introduce')
const { BabySitter, Babysitter } = require('../../../model/babysitter')
module.exports = async (req, res) => {
    const { adress } = req.params
    const { bid } = req.body
    req.body.adress = parseInt(adress)
    req.body.like = 0
    const introduceData = await Introduce.create(req.body)
    if (introduceData) {
        await Babysitter.updateOne({_id: bid}, {isArticle: true})
        // 添加成功
        return res.json({
            'data': req.body,
            'meta': {
                'status': 200,
                'message': '添加成功'
            }
        })
    } else {
        // 添加失败
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '添加失败'
            }
        })
    }
}