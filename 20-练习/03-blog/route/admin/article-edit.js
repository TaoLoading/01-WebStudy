module.exports = (req, res) => {
	// 表示当前访问的是文章页面
	req.app.locals.currentLink = 'article'

	res.render('admin/article-edit.art')
}
