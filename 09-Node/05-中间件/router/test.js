const express = require('express')

const router = express.Router()

router
  .get('/', (req, res) => {
    res.send('这是test首页')
  })
  .get('/download', (req, res) => {
    // 下载
    res.download()
  })
  .get('/json', (req, res) => {
    // 对象转json
    res.json({ name: 'taoloading' })
  })
  .get('/render', (req, res) => {
    // 渲染模板
    res.render()
  })
  .get('/status', (req, res) => {
    // 设置状态码
    /* res.status(201)
    res.send() */

    res.sendStatus(201)
  })

module.exports = router