const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const admin = require('./route/admin')

// 引入连接数据库文件
require('./model/connect')
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.static(path.join(__dirname, 'public')))
// 获取post传入的参数
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
// 配置模板的默认后缀
app.set('view engine', 'art');
// 配置模板的后缀为art时，使用什么引擎
app.engine('art', require('express-art-template'));

// 初始化passport
app.use(passport.initialize())
// 配置passport
require('./config/passport')(passport)

app.use('/admin', admin)
app.listen(3000, function() {
    console.log('服务器启动成功，端口3000')
})