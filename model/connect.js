const mongoose = require('mongoose')
mongoose.connect(`mongodb://homemaking:970321@localhost:27017/homemaking`,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('数据库homemaking连接成功'))
    .catch(() => console.log('数据库homemaking连接失败'))