/**
 * SSR使用模板：
 * 1.建立模板文件，并在模板文件中设置HTML注入标记：<!--vue-ssr-outlet-->，注意两边不能有空格
 * 2.使用fs读取模板文件，并将读取后的值传入render中，注意读取文件时最好使用绝对路径
 * 3.将需要的差值放到某一对象中，传入renderer.renderToString()
 * 4.在模板文件中使用双大括号包裹需要转义的变量，使用三大括号包裹不需要转义的变量
 */

const Vue = require('vue')
const fs = require('fs')
const VueSSRVenderer = require('vue-server-renderer')
const server = require('express')()
const path = require('path')
const templatePath = path.join(__dirname, 'index.template.html')

const context = {
  title: 'SSR-使用模板',
  metas:
    `
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  `
}

server.get('*', (req, res) => {
  // 创建一个Vue实例
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>this url is:{{ url }}</div>`
  })

  const template = fs.readFileSync(templatePath, 'utf-8')
  const renderer = VueSSRVenderer.createRenderer(template)

  // 将Vue实例渲染为HTML
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080, () => {
  console.log('服务器已运行')
})
