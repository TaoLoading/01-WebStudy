//把数据库想象成你家的别墅
let mongoose = require('mongoose')

//1.请来一个帮你看门的保安 ------ 引入模式对象
let Schema = mongoose.Schema

//2.制定进入你家的规则 --------  创建约束对象
let teachersRule = new Schema({
	teac_id: {
		type: String, //限制学号必须为：字符串
		required: true,
		unique: true,
	},
	name: {
		type: String, //限制姓名必须为：字符串
		required: true, //限制姓名为必填项
	},
	age: {
		type: Number, //限制年龄必须为：字符串
		required: true, //限制年龄为必填项
	},
	sex: {
		type: String, //限制性别必须为：字符串
		required: true, //限制性别为必填项
	},
	hobby: [String], //限制爱好只能为数组，数组中的每一项必须为字符串
	info: Schema.Types.Mixed, //接收所有类型
	date: {
		type: Date,
		default: Date.now(),
	},
	enable_flag: {
		type: String,
		default: 'Y',
	},
})

//3.告诉保安你的规则 ------- 创建模型对象
module.exports = mongoose.model('teachers', teachersRule) //用于生成某个集合所对应的模型对象
