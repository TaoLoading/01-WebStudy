// 导入文章集合构造函数
const { Article } = require('../../model/article')
// 导入mongoose-sex-page模块(用于分页)
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
	// 接收客户端传递过来的页码
	const page = req.query.page

	// 表示当前访问的是文章页面
	req.app.locals.currentLink = 'article'

	// 查询所有文章数据
	// let articles = await pagination(Article)
	// 	.find()
	// 	.page(1)
	// 	.size(2)
	// 	.display(3)
	// 	.populate('author') // 使用populate()进行多集合联合查询
	// 	.exec()
	let articles = await pagination(Article)
		.find()
		.page(page)
		.size(2)
		.display(3)
		.exec()
	// page:指定当前页
	// size:指定每页显示的数据条数
	// display:指定客户端显示的页码数量
	// exec:向数据库中发送查询请求

	// res.send(articles)

	// 重定向到文章列表页面
	res.render('admin/article.art', {
		articles: articles,
	})
}
