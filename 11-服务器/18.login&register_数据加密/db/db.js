/*
* 该模块主要用于连接数据库，且判断数据库的连接状态
* */
let mongoose = require('mongoose')
mongoose.set('useCreateIndex',true) //使用一个新的索引创建器

const DB_NAME = 'atguigu' //数据库名
const PORT = 27017 //端口号
const IP = 'localhost' //主机名(ip地址)

//用于连接数据、并监测数据库连接状态的方法
function connectMongo(success,failed) {
  //1.连接数据库
  mongoose.connect(`mongodb://${IP}:${PORT}/${DB_NAME}`,{
    useNewUrlParser: true, //使用一个新的URL解析器，用于解决一些安全性问题。
    useUnifiedTopology: true //使用一个统一的新的拓扑结构。
  })

  //2.绑定数据库连接的监听
  mongoose.connection.on('open',function (err) {
    if(err){
      console.log('数据库连接失败',err)
      failed('connect failed')
    }else{
      console.log('数据库连接成功')
      success()
    }
  })
}

module.exports = connectMongo

