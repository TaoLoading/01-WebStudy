const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

// 创建服务器实例
const server = http.createServer()

// 绑定端口监听
server.listen(8080, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:8080')
  }
})

// 完整响应流程
server.on('request', (req, res) => {
  // res.setHeader('Content-type', 'text/html;charset=utf-8')

  // 判断请求方法
  if (req.method === 'GET') {
    // 获取get请求的参数（请求头传参）
    console.log('get请求参数：', url.parse(req.url, true))

    // 判断请求路径
    if (req.url == '/') {
      fs.readFile(__dirname + '/示例页面.html', 'utf-8', (err, data) => {
        if (err) {
          res.write('html request error')
          res.end()
        } else {
          res.write(data)
          res.end()
        }
      })
    } else {
      fs.readFile(__dirname + '/示例图片.jpg', (err, data) => {
        if (err) {
          // 简写
          res.end('img request error')
        } else {
          res.end(data)
        }
      })
    }
  } else if (req.method === 'POST') {
    // 获取post请求的参数（请求体传参）
    let params = ''
    req.on('data', (data) => {
      params += data
    })
    req.on('end', () => {
      console.log('post请求参数：', qs.parse(params))
    })
    res.end()
  }
})