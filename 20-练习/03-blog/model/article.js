// 创建文章集合

// 引入mongoose模块
const mongoose = require('mongoose')

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
	// 标题
	title: {
		type: String,
		maxlength: 20,
		minlength: 1,
		required: [true, '请插入标题'], // 第一个参数为规定必填，第二个参数为错误信息
	},
	// 作者
	author: {
		type: mongoose.Schema.Types.ObjectId, // 特有类型
		// 关联User集合，存的是_id
		ref: 'User',
		required: [true, '请填写作者'],
	},
	// 发布时间
	publishDate: {
		type: Date,
		// 设置当前时间为默认时间
		default: Date.now,
	},
	// 封面(存储的是文件上传的路径及文件名称)
	cover: {
		type: String,
		default: null,
	},
	// 文章内容
	content: {
		type: String,
		required: [true, '请填写内容'],
	},
})

// 创建集合
const Article = mongoose.model('Article', articleSchema)

// 将文章集合作为模块进行导出
module.exports = {
	Article: Article,
}
