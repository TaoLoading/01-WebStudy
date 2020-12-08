// 引入mongoose
let mongoose = require('mongoose')
mongoose.set('useCreateIndex', true) // 使用一个新的索引创建器(不添加此代码mongoose会提示弃用警告)

// 1.连接数据库
mongoose.connect('mongodb://localhost:27017/demo', {
	useNewUrlParser: true, // 使用一个新的URL解析器，用于解决一些安全性问题。
	useUnifiedTopology: true, // 使用一个统一的新的拓扑结构。
})

// 2.绑定数据库连接的监听
mongoose.connection.on('open', function (err) {
	if (err) {
		console.log('数据库连接失败', err)
	} else {
		console.log('数据库连接成功')
		// 3.操作数据库

		// 把数据库想象成你家的别墅

		// (1).请来一个帮你看门的保安 ------ 引入模式对象
		let Schema = mongoose.Schema

		// (2).制定进入你家的规则 --------  创建约束对象
		let studentsRule = new Schema({
			stu_id: {
				type: String, // 限制学号必须为：字符串
				required: true, // 限制学号为必填项
				unique: true, // 限制学号是唯一的
			},
			name: {
				type: String, // 限制姓名必须为：字符串
				required: true, // 限制姓名为必填项
			},
			age: {
				type: Number, // 限制年龄必须为：字符串
				required: true, // 限制年龄为必填项
			},
			sex: {
				type: String, // 限制性别必须为：字符串
				required: true, // 限制性别为必填项
			},
			hobby: [String], // 限制爱好只能为数组，数组中的每一项必须为字符串
			info: Schema.Types.Mixed, // 接收所有类型

			// 存入日期(项目一般都要写上)
			date: {
				type: Date,
				default: Date.now(), // 设置默认值
			},
			// 逻辑删除(项目一般都要写上)
			enable_flag: {
				type: String,
				default: 'Y',
			},
		})

		// (3).告诉保安你的规则 ------- 创建模型对象
		// 在当前数据库中生成students集合
		let stuModel = mongoose.model('students', studentsRule) // mongoose.model()用于生成某个集合所对应的模型对象

		// (4).真正有人要进入你家了 -------- CRUD

		// 新增操作 --- C
		// stuModel.create(
		// 	{
		// 		stu_id: '001',
		// 		name: '强',
		// 		age: '42',
		// 		sex: '男',
		// 		hobby: ['女', '打代码', '打篮球'], // 限制爱好只能为数组，数组中的每一项必须为字符串
		// 		info: '一个风一样的男子', // 接收所有类型
		// 	},
		// 	function (err, data) {
		// 		if (!err) console.log(data)
		// 		else console.log(err)
		// 	}
		// ) // 运行后自动添加'__id'和'__v'

		//查询 --- R
		/*find方法：
        1.返回的是一个数组，就算是一条数据，也包裹一个数组
        2.若查询结果为空，则返回一个空数组。
    */
		// stuModel.find({ name: '金龙老师' }, function (err, data) {
		// 	if (!err) console.log(data)
		// 	else console.log(err)
		// })

		/*findOne方法：
        1.若有结果，返回的是一个对象
        2.若没有结果，返回一个null
    */
		// stuModel.findOne({ name: '强' }, { age: 42, _id: 0 }, function (
		// 	err,
		// 	data
		// ) {
		// 	if (!err) console.log(data)
		// 	else console.log(err)
		// })

		//更新 --- U
		// stuModel.updateOne({ name: '静静' }, { age: 16 }, function (err, data) {
		// 	if (!err) console.log(data)
		// 	else console.log(err)
		// })

		//删除 --- D
		// stuModel.deleteMany({ age: 16 }, function (err, data) {
		// 	if (!err) console.log(data)
		// 	else console.log(err)
		// })
	}
})
