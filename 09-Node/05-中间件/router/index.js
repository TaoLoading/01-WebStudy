const express = require('express')
const testRouter = require('./test')
const userRouter = require('./user')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('这是首页')
})

// 使用路由文件
router.use('/test', testRouter)
router.use('/user', userRouter)

module.exports = router