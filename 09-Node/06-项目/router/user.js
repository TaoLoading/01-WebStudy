const express = require('express')
const userController = require('../controller/userController')

const router = express.Router()

router
  .get('/', (req, res) => {
    res.send('/user')
  })
  .get('/list', userController.userList)
  .delete('/', userController.deleteUser)

module.exports = router