//导入文章集合构造函数
const { Article } = require('../../model/article')
// 导入评论界和构造函数
const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
	// 接收客户端传递来的文章id
	const id = req.query.id
	// 根据id在数据库中查询文章
	// let article = await Article.findOne({ _id: id }).populate('author')
	let article = await Article.findOne({ _id: id })
	// 查询当前文章对应的评论信息
	// let comments = await Comment.findOne({ aid: id }).populate('uid')
	let comments = await Comment.find({ aid: id })

	// res.send(comments)
	// return

	res.render('home/article.art', {
		article: article,
		comments: comments,
	})
}
