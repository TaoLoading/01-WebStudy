/**
 * 实现用户数据的增改查
 */

const express = require('express')
const dbOption = require('./db')

const app = express()

//设置接收的数据请求类型
app.use(express.urlencoded())
app.use(express.json())

// 查
app.get('/', async (req, res) => {
  try {
    const result = await dbOption.getData()
    res.send(result)
  } catch (err) {
    res.status(500).json(err)
  }
})

// 增
app.post('/', async (req, res) => {
  let body = req.body
  if (req.body) {
    // 实现 id 自增
    let userList = await dbOption.getData()
    body.id = userList.users.length + 1

    // 将请求数据写入原数据中
    userList.users.push(body)
    try {
      const addError = await dbOption.writeData(userList)
      if (!addError) {
        res.status(200).json({
          msg: '添加成功'
        })
      } else {
        res.status(500).json({
          error: addError
        })
      }
    } catch (err) {
      res.status(500).json({
        error: err
      })
    }
  } else {
    res.status(403).json({
      error: '缺少用户信息'
    })
  }
})

// 改
app.put('/:id', async (req, res) => {
  // 根据 id 匹配到用户信息
  let userList = await dbOption.getData()
  const userID = Number.parseInt(req.params.id)
  const user = userList.users.find(item => item.id == userID)

  if (user) {
    // 修改信息
    let body = req.body
    user.username = body.username ? body.username : user.username
    user.age = body.age ? body.age : user.age
    userList.users[userID - 1] = user

    // 写入信息
    const addError = await dbOption.writeData(userList)
    if (!addError) {
      res.status(200).json({
        msg: '修改成功'
      })
    } else {
      res.status(500).json({
        error: addError
      })
    }
  } else {
    res.status(403).json({
      error: '该用户不存在'
    })
  }
})

app.listen(8080, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:8080')
  }
})