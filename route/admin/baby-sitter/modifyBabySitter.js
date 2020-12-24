const { Babysitter } = require('../../../model/babysitter')
const { baseUrl } = require('../../../config/baseurl')
module.exports = async (req, res) => {
    const { id } = req.params
    let modifyData = {}
    if (req.body.avator === '') {
      modifyData = {
        age: parseInt(req.body.age),
        email: req.body.email,
        mobile: parseInt(req.body.mobile),
        price: parseInt(req.body.price),
        role: parseInt(req.body.role),
        state: parseInt(req.body.state),
        username: req.body.username
      }
    } else {
        modifyData = {
            age: parseInt(req.body.age),
            email: req.body.email,
            mobile: parseInt(req.body.mobile),
            price: parseInt(req.body.price),
            role: parseInt(req.body.role),
            state: parseInt(req.body.state),
            username: req.body.username,
            avator: req.body.avator
          }
    }
    const babysitterData = await Babysitter.updateOne({_id: id}, modifyData)
    if (babysitterData) {
        modifyData.avator = baseUrl + modifyData
        return res.json({
            'data': modifyData,
            'meta': {
                'status': 200,
                'message': '修改成功'
            }
        })
    } else {
        return res.json({
            'data': null,
            'meta': {
                'status': 400,
                'message': '修改失败'
            }
        })
    }
}