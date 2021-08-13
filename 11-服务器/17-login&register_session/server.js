//引入express
const express = require('express')
//创建app应用对象
const app = express()
//禁止服务器返回X-Powered-By,为了安全
app.disable('x-powered-by')
//使用内置中间件暴露静态资源，不访问路由直接写文件名+后缀也能看页面
app.use(express.static(__dirname+'/public'))
//配置模板引擎
app.set('view engine','ejs')
app.set('views','./views')
//引入db模块，用于连接数据库
const db = require('./db/db')
//使用内置中间件用于解析post请求的urlencoded参数
app.use(express.urlencoded({extended:true}))
//引入UI路由器
const UIRouter = require('./router/UIRouter')
//引入登录注册路由器
const loginRegisterRouter = require('./router/loginRegisterRouter')


//如下代码是配置express中操作session
//引入express-session，用于在express中简化操作session
const session = require('express-session');
//引入connect-mongo，用于做session持久化
const MongoStore = require('connect-mongo')(session);


app.use(session({
  name: 'peiqi',   //返回给客户端cookie的key。
  secret: 'atguigu', //参与加密的字符串（又称签名）
  saveUninitialized: false, //是否在存储内容之前创建session会话
  resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化（比较保险）
  store: new MongoStore({
    url: 'mongodb://localhost:27017/sessions_container',
    touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作cookie
    maxAge: 1000*30 // 设置cookie的过期时间,cookie的key，cookie的value，均不在此处配置。
  },
}));




//逻辑：如果数据库连接成功，随后立即启动服务器，在整个过程中，无论多少次请求，数据库只连接一次。
db(()=>{

  //使用UIRouter
  app.use(UIRouter())
  //使用loginRegisterRouter
  app.use(loginRegisterRouter())

  //绑定端口监听
  app.listen(3000,(err)=>{
    if(!err) console.log('服务器启动成功！')
    else console.log(err)
  })
},(err)=>{
  console.log('数据库连接失败',err)
})
