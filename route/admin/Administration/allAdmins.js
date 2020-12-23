// 获取所有的管理员信息
const { Admin } = require('../../../model/admin')
const { baseUrl } = require('../../../config/baseurl')
module.exports = async (req, res) => {
    const { adress } = req.params
    const { query, pagenum, pagesize } = req.query
    if (!pagenum || pagenum <= 0) {
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
    await Admin.countDocuments({ adress: adress }, async (err, count) => {
        if (err) {
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '获取用户信息失败'
                }
            })
        } else {
            const adminDatas = await Admin.find({adress: adress, username: {$regex: queryReg}}).skip((pagenum - 1) * pagesize).limit(parseInt(pagesize))
            if (adminDatas) {
                // 获取成功
                adminDatas.forEach(item => {
                    item.password = '',
                    item.avator = baseUrl + item.avator
                })
                return res.json({
                    'total': count,
                    'data': adminDatas,
                    'meta': {
                        'status': 200,
                        'message': '获取管理员信息成功'
                    }
                })
            } else {
                // 获取失败
                return res.json({
                    'data': null,
                    'meta': {
                        'status': 400,
                        'message': '获取管理员信息失败'
                    }
                })
            }
        }
    })
}