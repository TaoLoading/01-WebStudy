const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')

const app = express()

const PORT = process.env.PORT || 3000

// 获取请求参数中间件
app.use(express.json())
app.use(express.urlencoded())

// 跨域请求处理中间件
app.use(cors())

// 日志记录中间件
app.use(morgan('dev'))

// 路由中间件
app.use(router)

// 错误处理中间件
app.use((err, req, res, next) => { // 当传参个数为4个时，express默认当前中间件为错误处理中间件
  res.status(500).send('服务端请求出错')
})

// 挂载统一处理服务端错误的中间件
// app.use(errorHandler())

app.listen(PORT, (err) => {
  if (err) {
    console.log('服务端发生错误：' + err)
  } else {
    console.log(`服务已启动：http://localhost:${PORT}`)
  }
})