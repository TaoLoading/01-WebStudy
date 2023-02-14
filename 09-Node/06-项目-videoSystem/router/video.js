const express = require('express')
const videoController = require('../controller/videoController')

const router = express.Router()

router
  .get('/', (req, res) => {
    res.send('/video')
  })
  .get('/list', videoController.videoList)
  .delete('/', videoController.deleteVideo)

module.exports = router