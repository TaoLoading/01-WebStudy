const Koa = require('koa')
const Router = require('@koa/router')
const { koaBody } = require('koa-body')

const app = new Koa()
const router = new Router()

app.use(koaBody())

// 路由前缀
router.prefix('/api')

router.get('/user', ctx => {
  ctx.body = 'user'
})

router.get('/getParams/:id', ctx => {
  // 动态参数
  console.log('动态参数', ctx.params)
  // query参数
  console.log('query参数', ctx.query)
  ctx.body = 'get传参'
})

router.post('/postParams', ctx => {
  // body参数
  console.log('body参数', ctx.request.body)
  ctx.body = 'post传参'
})

app.use(router.routes())

app.listen(8081, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:8081')
  }
})