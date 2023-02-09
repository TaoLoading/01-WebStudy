const express = require('express')

const router = express.Router()

router
  .get('/', (req, res) => {
    res.send('这是user首页')
  })

module.exports = router