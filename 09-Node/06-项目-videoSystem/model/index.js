const mongoose = require('mongoose')
const userModel = require('./userModel')

const main = async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect('mongodb://localhost:27017/express_video')
}

main()
  .then(res => {
    console.log('连接成功')
  })
  .catch(err => {
    console.log('连接失败', err)
  })

// 导出模型
module.exports = {
  User: mongoose.model('User', userModel)
}