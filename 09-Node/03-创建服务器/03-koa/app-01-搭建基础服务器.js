const Koa = require('koa')

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello'
})

app.listen(8081, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:8081')
  }
})