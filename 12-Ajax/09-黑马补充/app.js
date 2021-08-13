// 引入express框架
const express = require('express')
// 路径处理模块
const path = require('path')
// 用于处理FormData对象中的请求参数（之前是使用express.urlencoded）
const formidable = require('formidable')
// 创建web服务器
const app = express()

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')))

// 邮箱地址验证
app.get('/verifyEmailAdress', (req, res) => {
	// 接收客户端传递过来的邮箱地址
	const email = req.query.email
	// 判断邮箱地址注册过的情况
	if (email == 'itheima@itcast.cn') {
		// 设置http状态码并对客户端做出响应
		res.status(400).send({
			message: '邮箱地址已经注册过了, 请更换其他邮箱地址',
		})
	} else {
		// 邮箱地址可用的情况
		// 对客户端做出响应
		res.send({ message: '恭喜, 邮箱地址可用' })
	}
})

// 输入框文字提示
app.get('/searchAutoPrompt', (req, res) => {
	// 搜索关键字
	const key = req.query.key
	// 提示文字列表
	const list = [
		'黑马程序员',
		'黑马程序员官网',
		'黑马程序员顺义校区',
		'黑马程序员学院报名系统',
		'传智播客',
		'传智博客前端与移动端开发',
		'传智播客大数据',
		'传智播客python',
		'传智播客java',
		'传智播客c++',
		'传智播客怎么样',
	]
	// 搜索结果
	let result = list.filter((item) => item.includes(key))
	// 解决跨域问题
	res.setHeader('Access-Control-Allow-Origin', '*')
	// 将查询结果返回给客户端
	res.send(result)
})

// 获取省份
app.get('/province', (req, res) => {
	res.json([
		{
			id: '001',
			name: '黑龙江省',
		},
		{
			id: '002',
			name: '四川省',
		},
		{
			id: '003',
			name: '河北省',
		},
		{
			id: '004',
			name: '江苏省',
		},
	])
})

// 根据省份id获取城市
app.get('/cities', (req, res) => {
	// 获取省份id
	const id = req.query.id
	// 城市信息
	const cities = {
		'001': [
			{
				id: '300',
				name: '哈尔滨市',
			},
			{
				id: '301',
				name: '齐齐哈尔市',
			},
			{
				id: '302',
				name: '牡丹江市',
			},
			{
				id: '303',
				name: '佳木斯市',
			},
		],
		'002': [
			{
				id: '400',
				name: '成都市',
			},
			{
				id: '401',
				name: '绵阳市',
			},
			{
				id: '402',
				name: '德阳市',
			},
			{
				id: '403',
				name: '攀枝花市',
			},
		],
		'003': [
			{
				id: '500',
				name: '石家庄市',
			},
			{
				id: '501',
				name: '唐山市',
			},
			{
				id: '502',
				name: '秦皇岛市',
			},
			{
				id: '503',
				name: '邯郸市',
			},
		],
		'004': [
			{
				id: '600',
				name: '常州市',
			},
			{
				id: '601',
				name: '徐州市',
			},
			{
				id: '602',
				name: '南京市',
			},
			{
				id: '603',
				name: '淮安市',
			},
		],
	}
	// 响应
	res.send(cities[id])
})

// 根据城市id获取县城
app.get('/areas', (req, res) => {
	// 获取城市id
	const id = req.query.id
	// 县城信息
	const areas = {
		300: [
			{
				id: '20',
				name: '道里区',
			},
			{
				id: '21',
				name: '南岗区',
			},
			{
				id: '22',
				name: '平房区',
			},
			{
				id: '23',
				name: '松北区',
			},
		],
		301: [
			{
				id: '30',
				name: '龙沙区',
			},
			{
				id: '31',
				name: '铁锋区',
			},
			{
				id: '32',
				name: '富拉尔基区',
			},
		],
	}
	// 响应
	res.send(areas[id] || [])
})

app.post('/formData', (req, res) => {
	// 解决跨域问题
	res.setHeader('Access-Control-Allow-Origin', '*')
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm()
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		// 三个参数分别为：错误对象、表单中的普通请求参数、和文件上传有关的信息
		res.send(fields)
	})
})

// 实现文件上传的路由
app.post('/upload', (req, res) => {
	// 解决跨域问题
	res.setHeader('Access-Control-Allow-Origin', '*')
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm()
	// 设置客户端上传文件的存储路径
	form.uploadDir = path.join(__dirname, 'public', 'upload')
	// 保留上传文件的后缀名字
	form.keepExtensions = true
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		// // 图片存放的地址
		// res.send(files.attrName.path) // d:\workplace\001-web\12-Ajax\9.黑马补充\public\upload\upload_2fc1fd3d0072e1dd72ab7c05ea26d13a
		// 将客户端传递过来的文件地址响应到客户端
		res.send({
			path: files.attrName.path.split('public')[1],
		})
	})
})

// 监听端口
app.listen(3000)
// 控制台提示输出
console.log('服务器启动成功')
