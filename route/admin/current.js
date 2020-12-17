module.exports = (req, res) => {
        res.json({"data": req.user, "meta": { "status": 200, "message": "验证成功" }})
}