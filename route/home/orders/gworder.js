const { Order } = require('../../../model/order')

module.exports = async (req, res) => {
    const data = {
        uid: req.body.uid,
        bid: req.body.bid,
        price: parseInt(req.body.price),
        currentDate: req.body.currentDate,
        appTime: req.body.appTime,
        description: req.body.description,
        state: parseInt(req.body.state),
        adress: parseInt(req.body.adress)
    }
    const orderData = await Order.create(data)
    if (orderData) {
        // 添加成功
        return {
            'data': orderData,
            'meta': {
                'status': 200,
                'message': '添加成功'
            }
        }
    } else {
        // 添加失败
        return {
            'data': null,
            'meta': {
                'status': 400,
                'message': '添加失败'
            }
        }
    }
}