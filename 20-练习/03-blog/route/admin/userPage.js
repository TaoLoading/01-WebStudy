// 引入User集合的构造函数
const user = require('../../model/user')
const { User } = require('../../model/user')
module.exports = async (req, res) => {
	// 表示当前访问的是用户页面
	req.app.locals.currentLink = 'user'

	// 计算页数
	// 接收客户端传过来的当前页参数
	let page = req.query.page || 1
	// 每一页显示的数据数
	let pagesize = 10
	// 数据总数
	let count = await User.countDocuments()
	// 总页数
	let total = Math.ceil(count / pagesize)
	// 页码对应的开始位置
	let start = (page - 1) * pagesize
	// 将用户信息从数据库中查询出来并渲染到页面
	let users = await User.find({}).limit(pagesize).skip(start) // limit()：限制数据查询的数量。skip():跳过多少条数据
	res.render('admin/user', {
		users: users,
		page: page,
		total: total,
	})
}
