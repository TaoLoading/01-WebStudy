
const express = require('express')
const app = express()

/**
 * 1. 拼接在url后的参数
 * 使用 req.params
 */
app.get('/api/user/:userId', (req, res) => {
  console.log(req.params.userId)
  res.status(200).send('OK')
})

/**
 * 2. form-data 格式
 * 使用 multer 模块
 */
const multer = require('multer')
const upload = multer()
app.post('/api/login', upload.none(), (req, res) => {
  res.status(200).send('OK')
})

/**
 * 3. x-www-form-urlencoded 格式
 * 使用 body-parser 模块
 */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/api/login', (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  res.status(200).send('OK')
})

/**
 * 4. raw 格式
 * 使用 body-parser 模块
 */
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post('/api/login', (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  res.status(200).send('OK');
})