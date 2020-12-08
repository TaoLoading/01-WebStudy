const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	// 获取页码值
	const page = req.query.page;

	// 从数据库中查询数据
	let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();

	// res.send('欢迎来到博客首页')
	// 渲染模板并传递数据
	res.render('home/default.art', {
		result: result
	});
}