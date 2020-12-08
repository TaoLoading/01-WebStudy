// 引入formidable第三方模块
const formidable = require('formidable')
const path = require('path')
// 导入文章集合构造函数，方便向文章插入数据
const { Article } = require('../../model/article')

module.exports = (req, res) => {
	// 创建表单解析对象
	const form = new formidable.IncomingForm()
	// 配置上传文件的存放位置
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
	// 保留上传文件的后缀
	form.keepExtensions = true
	// 解析表单
	form.parse(req, async (err, fields, files) => {
		// err：错误对象。如果表单解析失败，err里存储错误信息，如果解析成功，err就是null
		// fields：保存普通表单数据，即除上传文件外的其他数据，对象类型
		// files：保存上传文件相关的数据，对象类型
		// console.log(files.cover.path) // 文件在本机的位置：d:\workplace\001-web\20-练习\03-blog\public\uploads\upload_94508070e4b2d0d4926e9f345ffa852b.png
		// console.log(files.cover.path.split('public')[1]) // 截取后位于服务器的位置
		// 向文章集合中插入数据
		await Article.create({
			title: fields.title,
			author: fields.author,
			publishDate: fields.publishDate,
			cover: files.cover.path.split('public')[1],
			content: fields.content,
		})
		// 重定向到文章列表页面
		res.redirect('/admin/article')
	})
}
