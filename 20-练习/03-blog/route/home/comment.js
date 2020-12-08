// 导入评论集合的构造函数
const { Comment } = require('../../model/comment')

module.exports = async (req, res) => {
	// 接收客户端传递来的请求参数
	const { content, uid, aid } = req.body
	// 将评论信息存储到评论集合
	await Comment.create({
		content: content,
		uid: uid,
		aid: aid,
		time: new Date(),
	})
	// 重定向到文章详情页面
	res.redirect('/home/article?id=' + aid)
}
