const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const app = new Koa
const router = new Router

// 定义请求前缀
router.prefix('/api')

// 定义后端路由
router.get('/', ctx => {
  console.log('ctx', ctx)
  ctx.body = 'Hello World!'
})
router.get('/test', ctx => {
  // 获取get请求中的params
  const params = ctx.request.query
  console.log('params', params)
  ctx.body = {
    ...params
  }
})

// 结合async和await的使用
router.get('/async', async ctx => {
  let result = await new Promise(resolve => {
    setTimeout(() => {
      resolve('两秒后返回的数据')
    }, 2000);
  })
  ctx.body = result
})

// 定义接口
router.post('/post', async ctx => {
  let { body } = ctx.request
  console.log('body', body)
  console.log('ctx.request', ctx.request)
  // 此时ctx.body相当于response
  ctx.body = {
    ...body
  }
})

app.use(koaBody())
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('服务已启动')
})
