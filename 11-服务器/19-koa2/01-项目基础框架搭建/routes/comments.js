/**
 * 路由的使用：
 * 1.定义路由文件  包括引入router、定义前缀、定义路由、暴露路由
 * 2.在app.js中引入路由文件  const xxx = require('./routes/xxx')
 * 3.在app.js中注册路由  app.use(xxx.routes(), xxx.allowedMethods())
 * 
 * ctx可以看做request和response的集合
 */
const router = require('koa-router')()
router.prefix('/api')

// 模拟获取留言板路由
router.get('/list', async (ctx) => {
  const query = ctx.query
  console.log('query', query)
  ctx.body = {
    errno: 0,
    data: [
      { content: '留言1', user: '张三' },
      { content: '留言2', user: '李四' }
    ]
  }
})
// 模拟创建留言路由
router.post('/create', async (ctx) => {
  const body = ctx.request.body
  console.log('body', body)
  ctx.body = {
    errno: 0,
    msg: '留言成功'
  }
})

module.exports = router