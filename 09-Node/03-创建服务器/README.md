## 创建服务器

### 原生node

1. 基本过程
   1. 引入http并创建服务器实例
   2. 绑定端口监听
   3. 完成响应。最后需要断开连接，否则请求流程不完整，客户端显示不了数据
2. 数据响应
   1. 设置响应头：` res.setHeader('Content-type', 'text/html;charset=utf-8') `
   2. 获取get/post请求参数
      1. get：` url.parse(req.url, true) `
      2. post：
      ```
      let params = ''
      req.on('data', (data) => {
       params += data
      })
      req.on('end', () => {
       console.log('post请求参数：', qs.parse(params))
      })
      ```
   3. 写入数据：
      ```
      fs.readFile(__dirname + '/示例页面.html', 'utf-8', (err, data) => {
        if (err) {
          res.write('html request error')
          res.end()
        } else {
          res.write(data)
          res.end()
        }
      })
      ```
   4. 断开连接：` res.end() `
   5. ...

### express

1. 基本过程
   1. 创建实例
   2. 设置路由
   3. 设置监听
2. 数据响应。此处补充一些操作，具体api见官网文档
   1. 将readFile promise化，用于避免产生回调地狱
   2. 请求头：` req.headers `
   3. 请求体：` req.body `
3. ...

### koa

1. 上下文 Context

   Koa Context将node的request和response对象封装到单个对象中，每个请求都将创建一个context，并在中间件中作为接收器引用，或者 ctx 标识符，如以下代码片段所示：

   ```javascript
   app.use(async ctx => {
     ctx // is the Context
     ctx.request // is a Koa Request
     ctx.response // is a Koa Response
   })
   ```

​		注：绕过Koa的response处理是不被支持的，应避免使用如res.end()的node 属性。

2. 洋葱圈模型

   ![](D:\MyProjects\01-WebStudy\09-Node\03-创建服务器\03-koa\img\洋葱圈模型.png)

2. 路由

