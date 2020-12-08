const express = require('express')
// 引入用户集合构造函数
const { User } = require('../model/user')

// 创建博客展示页面路由
const admin = express.Router()

// 渲染登录页面路由
admin.get('/login', require('./admin/loginPage'))

// 登录功能路由
admin.post('/login', require('./admin/login'))

// 渲染用户列表页面路由
admin.get('/user', require('./admin/userPage'))

// 退出功能路由
admin.get('/logout', require('./admin/loginOut'))

// 新建用户页面路由
admin.get('/user-edit', require('./admin/user-edit'))

// 添加用户功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

// 修改用户功能路由
admin.post('/user-modify', require('./admin/user-modify'))

// 删除用户功能路由
admin.get('/delete', require('./admin/user-delete'))

// 文章列表页面路由
admin.get('/article', require('./admin/article'))

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))

// 文章添加功能路由
admin.post('/article-add', require('./admin/article-add'))

module.exports = admin
