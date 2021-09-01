/**
 * 什么是服务器端渲染(SSR)？
 * 将组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序。
 * 
 * 为什么使用服务器端渲染?
 * 1. 更好的SEO
 * 2. 更快的到达时间。无需等待所有的 JavaScript 都完成下载并执行才显示服务器渲染的标记，用户将会更快速地看到完整渲染的页面
 * 
 * SPA应用首屏加载时间长，且不利于SEO
 */

const Vue = require('vue')
// 创建renderer
const renderer = require('vue-server-renderer').createRenderer()
// 创建服务器
const server = require('express')()

server.get('*', (req, res) => {
  // 创建一个Vue实例
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>this url is:{{ url }}</div>`
  })

  // 将Vue实例渲染为HTML
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
      `
    )
  })
})

server.listen(8080, () => {
  console.log('服务器已运行')
})
