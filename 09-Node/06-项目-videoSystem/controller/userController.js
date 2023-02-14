const { User } = require('../model/index')

// 注册
exports.register = async (req, res) => {
  const userModel = new User(req.body)
  const dbBack = await userModel.save()
  res.status(201).json(dbBack)
}

// 获取用户列表
exports.userList = async (req, res) => {
  res.send('/userList')
}

// 删除用户
exports.deleteUser = async (req, res) => {
  res.send('/deleteUser')
}