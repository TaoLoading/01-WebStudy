const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()

router.get('/throw', ctx => {
  ctx.throw(400, '400 错误')
  ctx.body = 'throw'
})

router.get('/error', ctx => {
  JSON.parse('')
  ctx.body = 'error'
})


// 监听错误
app.on('error', (err, ctx) => {
  console.log('error 是', err)
  ctx.body = err
})

app.use(router.routes())

app.listen(8081, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:8081')
  }
})