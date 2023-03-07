const Koa = require('koa')

const app = new Koa()

const middleware1 = (ctx, next) => {
  console.log('中间件1 start')
  next()
  console.log('中间件1 end')
}

const middleware2 = (ctx, next) => {
  console.log('中间件2 start')
  next()
  console.log('中间件2 end')
}

// 打印结果是：中间件1 start，中间件2 start，中间件2 end，中间件1 end
/* app.use(middleware1)
app.use(middleware2) */

const middleware3 = (ctx, next) => {
  console.log('中间件3 start')
  next()
  console.log('中间件3 end')
}

const middleware4 = async (ctx, next) => {
  await console.log('中间件4 start')
  next()
  await console.log('中间件4 end')
}

const middleware5 = (ctx, next) => {
  console.log('中间件5 start')
  next()
  console.log('中间件5 end')
}

// 打印结果是：中间件3 start，中间件4 start，中间件3 end，中间件5 start，中间件5 end，中间件4 end
// 因为遇到异步的中间件4后，导致当前执行的中间件调用栈结束，故执行“中间件3 end”
app.use(middleware3)
app.use(middleware4)
app.use(middleware5)

app.listen(8081, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:8081')
  }
})