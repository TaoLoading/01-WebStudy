module.exports = (req, res) => {
	req.session.destroy(function () {
		// 删除cookie
		res.clearCookie('connect.sid')
		// 重定向
		res.redirect('/admin/login')
		// 清除模板中的用户信息
		res.app.locals.userInfo = null
	})
}
