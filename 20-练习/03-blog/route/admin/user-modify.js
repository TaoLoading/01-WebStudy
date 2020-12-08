const { render } = require('art-template')
const { User } = require('../../model/user')
const sha1 = require('sha1')

module.exports = async (req, res, next) => {
	// 接收客户端传来的请求参数(post请求)
	const { username, email, password, role, state } = req.body
	// 接收被修改的用户的id(get请求)
	const id = req.query.id

	let user = await User.findOne({ _id: id })
	// 密码比对
	if (sha1(password) == user.password) {
		// 更新用户信息到数据库
		await User.updateOne(
			{ _id: id },
			{
				username: username,
				email: email,
				role: role,
				state: state,
			}
		)
		// 重定向页面
		res.redirect('/admin/user')
	} else {
		let obj = {
			path: '/admin/user-edit',
			message: '密码比对失败，不能进行用户信息的修改',
			id: id,
		}
		next(JSON.stringify(obj))
	}
	// res.send(user)
}
