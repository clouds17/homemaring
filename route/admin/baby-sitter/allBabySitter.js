const { Babysitter } = require('../../../model/babysitter')
const { baseUrl } = require('../../../config/baseurl')

module.exports = async (req, res) => {
    console.log(baseUrl)
    const { adress } = req.params
    const { query, pagenum, pagesize } = req.query
    if (!pagesize || pagesize <= 0) {
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '参数错误'
            }
        })
    }
    if (!pagesize || pagesize <= 0) {
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '参数错误'
            }
        })
    }
    const queryReg = new RegExp(query, 'i')
    await Babysitter.countDocuments({adress: adress}, async (err, count) => {
        if (err) {
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '获取用户失败失败'
                }
            })
        } else {
            const babysitterData = await Babysitter.find({adress: adress, username: { $regex: queryReg }}).skip((pagenum-1)*pagesize).limit(parseInt(pagesize))
            if (babysitterData) {
                babysitterData.forEach(item => {
                    item.password = '',
                    item.avator = baseUrl + item.avator
                })
                return res.json({
                    'total': count,
                    'data': babysitterData,
                    'meta': {
                        'status': 200,
                        'message': '获取用户信息成功'
                    }
                })
            } else {
                return res.json({
                    'data': null,
                    'meta': {
                        'status': 400,
                        'message': '获取用户信息失败'
                    }
                })
            }
        }
    })
}