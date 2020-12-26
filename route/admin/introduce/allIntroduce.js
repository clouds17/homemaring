const { Introduce } = require('../../../model/introduce')
const { baseUrl } = require('../../../config/baseurl')

module.exports = async (req, res) => {
    const { adress } = req.params
    const { query, pagesize, pagenum } = req.query
    if (!pagesize || pagesize <= 0) {
      return res.json({
          'data': null,
          'meta': {
              'status': 400,
              'message': '参数不正确'
          }
      })
    }
    if (!pagenum || pagenum <= 0) {
      return res.json({
          'data': null,
          'meta': {
              'status': 400,
              'message': '参数不正确'
          }
      })
    }
    await Introduce.countDocuments({adress: parseInt(adress)}, async (err, count) => {
        if (err) {
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '获取用户信息失败'
                }
            })
        }
        let introduceData
        if (query !== '') {
            introduceData = await Introduce.find({adress: adress, bid: query}).populate('bid')
        } else {
            introduceData = await Introduce.find({adress: adress}).skip((pagenum-1)*pagesize).limit(parseInt(pagesize)).populate('bid')
        }
        if (introduceData) {
            introduceData.forEach(item => {
                let url = item.pics.split(',')
                for (let i = 0; i < url.length; i++) {
                    url[i] = baseUrl + url[i]
                }
                item.content = item.content.replace(/^[<p>]{3}|[</p>]{4}$/g, '')
                item.pics = url.join(',')
            })
            return res.json({
                'data': introduceData,
                'total': count,
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
    })
}