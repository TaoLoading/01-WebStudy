const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static')

const index = require('./routes/index')
const users = require('./routes/users')
const comments = require('./routes/comments')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  // request body转换
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(static(__dirname + '/public'))

// 服务端模板引擎
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger 格式化日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 模拟登录，演示中间件
app.use(async (ctx, next) => {
  const query = ctx.query
  if (query.user == 'zhangsan') {
    // 模拟登录成功
    await next()
  } else {
    // 模拟登录失败
    ctx.body = '登录失败'
  }
})

// routes 注册路由
// allowedMethods()是对404或者返回是空的情况的一种补充
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
