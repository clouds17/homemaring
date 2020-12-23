const { User } = require('../../../model/user')
module.exports = async (req, res, next) => {
    const { email } = req.params
    console.log(email)
    const isEqual = await User.findOne({email: email})
    if (!isEqual) {
        res.json({
            "data": { "email": email },
            "meta": { "status": 200,  message: "该邮箱可用"}
        })
    } else {
        res.json({
            "data": null,
            "meta": { "status": 400, message: "该邮箱已存在" }
        })
    }
}