
const http = require('http')

/**
 * 1. 拼接在 url 后的参数
 * 使用 url 和 querystring 模块
 */
const url = require('url')
const querystring = require('querystring')
http.createServer((req, res) => {
  const urlObj = url.parse(req.url)
  const queryObj = querystring.parse(urlObj.query)
  console.log(queryObj.username)
  console.log(queryObj.password)
  res.statusCode = 200
  res.end('OK')
}).listen(3000)

/**
 * 2. form-data 格式
 * 使用 formidable 模块
 */
const querystring = require('querystring')
http.createServer((req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    console.log(fields.username)
    console.log(fields.password)
    res.statusCode = 200
    res.end('OK')
  })
}).listen(3000)

/**
 * 3. x-www-form-urlencoded 格式
 * 使用 querystring 模块
 */
const querystring = require('querystring')
http.createServer((req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = querystring.parse(body)
    console.log(data.username)
    console.log(data.password)
    res.statusCode = 200
    res.end('OK')
  })
}).listen(3000)

/**
 * 4. raw 格式
 * 使用 body-parser 模块
 */
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.post('/api/login', (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  res.status(200).send('OK')
})