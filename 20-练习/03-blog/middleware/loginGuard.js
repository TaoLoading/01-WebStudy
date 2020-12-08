const guard = (req, res, next) => {
	// 判断用户访问的是否为登陆页面
	// 判断用户登录状态
	// 如果用户是登录的，则将请求重定向到登陆页面
	// 如果用户不是登录的，则将请求重定向到登陆页面
	if (req.url != '/login' && !req.session.username) {
		res.redirect('/admin/login')
	} else {
		// 如果用户是登陆状态，并且是一个普通用户
		if (req.session.role == 'normal') {
			return res.redirect('/home')
		}
		next()
	}
}

module.exports = guard
