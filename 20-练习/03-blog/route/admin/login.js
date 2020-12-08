// 引入user模块
const { User } = require('../../model/user')
// 引入sha1加密模块
const sha1 = require('sha1')
const user = require('../../model/user')

module.exports = (req, res) => {
	const { email, password } = req.body

	// 在服务器端对输入内容进行二次检查，防止浏览器禁用JavaScript导致检查失效
	// 用户没有输入邮件或密码时
	if (email.trim().length == 0 || password.trim().length == 0) {
		return res
			.status(400)
			.render('admin/error', { msg: '邮件地址或密码未填写' })
	}

	// 根据邮箱地址查询用户信息
	User.findOne({ email }, (err, user) => {
		if (user) {
			// 查询到用户
			// 将输入的密码与服务器中的密码进行比对
			if (sha1(password) == user.password) {
				// 密码正确

				// 将用户名和角色储存在session对象中
				req.session.username = user.username
				req.session.role = user.role
				// 开放user信息到locals
				req.app.locals.userInfo = user
				// 对用户角色进行判断
				if (user.role == 'admin') {
					// 管理员重定向到用户列表页面
					res.redirect('/admin/user')
				} else {
					// 普通用户跳转到博客首页
					res.redirect('/home')
				}
			} else {
				// 密码错误

				return res.status(400).render('admin/error', {
					msg: '邮件地址或密码错误',
				})
			}
		} else {
			// 未查询到用户
			return res.status(400).render('admin/error', {
				msg: '未查询到用户，请检查您的邮箱地址',
			})
		}
		return
	})
}
