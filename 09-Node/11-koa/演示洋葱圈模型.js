/**
 * 演示洋葱圈模型
 * 打印顺序为：中间件1 start => 中间件2 start => 中间件2 end => 中间件1 end
 * 先进后出
 */

const Koa = require('koa')
const app = new Koa

const middleware1 = function async(ctx, next) {
  console.log('中间件1 start')
  next()
  console.log('中间件1 end')
}

const middleware2 = function async(ctx, next) {
  console.log('中间件2 start')
  next()
  console.log('中间件2 end')
}

app.use(middleware1)
app.use(middleware2)

app.listen(3000, () => {
  console.log('服务已启动')
})
