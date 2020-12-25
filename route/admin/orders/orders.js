const e = require('express')
const { Order } = require('../../../model/order')
module.exports = async (req, res) => {
    const { adress } = req.params
    let { query, pagesize, pagenum, state } = req.query
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
    let condition = {}
    if (state) {
        condition = { adress: adress, state: parseInt(state) }
        pagenum = 1
    } else {
        condition = { adress: adress }
    }
    await Order.countDocuments(condition, async (err, count) => {
        if (err) {
            return res.json({
                'data': null,
                'meta': {
                    'status': 400,
                    'message': '获取订单信息失败'
                }
            })
        } else {
            let orderData
            if (query !== '') {
                orderData = await Order.find({_id: query}).populate(['uid', 'bid'])
            } else if (state !== '') {
                orderData = await Order.find({state: parseInt(state)}).skip((pagenum-1)*pagesize).limit(parseInt(pagesize)).populate(['uid', 'bid'])
            } else {
                orderData = await Order.find({adress: adress}).skip((pagenum-1)*pagesize).limit(parseInt(pagesize)).populate(['uid', 'bid'])
            }
            console.log(count)
            if (orderData) {
                return res.json({
                    'data': orderData,
                    'total': count,
                    'meta': {
                        'status': 200,
                        'message': '获取订单信息成功'
                    }
                })
            } else {
                return res.json({
                    'data': null,
                    'meta': {
                        'status': 400,
                        'message': '获取订单信息失败'
                    }
                })
            }
        }
    })
}