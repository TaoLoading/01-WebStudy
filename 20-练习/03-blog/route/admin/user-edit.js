const { User } = require('../../model/user')

module.exports = async (req, res) => {
	// 表示当前访问的是用户页面
	req.app.locals.currentLink = 'user'

	// 获取地址栏中的id参数
	// 获取的到就是修改用户操作，获取不到就是添加用户操作
	const { message, id } = req.query
	if (id) {
		let user = await User.findOne({ _id: id })
		// 渲染用户修改页面
		res.render('admin/user-edit', {
			message: message,
			user: user,
			link: '/admin/user-modify?id=' + id,
			button: '修改',
		})
	} else {
		res.render('admin/user-edit', {
			message: message,
			link: '/admin/user-edit',
			button: '添加',
		})
	}
}
