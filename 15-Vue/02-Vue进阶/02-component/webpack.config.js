// 引入插件
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 指定路径函数(简化操作path路径)
function resolve(dir) {
	// 返回指定路径的绝对路径
	return path.resolve(__dirname, dir)
}

module.exports = {
	// 模式(也可在package文件中的"script"中直接指定)
	// mode: 'development',

	// 入口(值可以是字符串或对象)
	entry: './src/index.js',
	// 对象形式：
	// entry: {
	// 	main: './src/index.js',
	// },

	// 出口(值只能是对象)
	output: {
		// 指定打包到哪个文件，绝对路径
		// 所有打包生成文件的基础路径
		path: resolve('dist'),
		// 指定打包生产文件的名字
		filename: '[name]bundle.js', // [name]是个占位符，对应entry中的'main'，同理'main'也可换成其他
		// 生成的引用路径左边都加一个'/'
		publicPath: '/',
	},

	// 模块加载器(值是对象)
	module: {
		rules: [
			// 内部配置loader
			// 多个loader执行顺序是从下往上，从右往左

			// 处理vue文件
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},

			// 处理ES6语法(ES6 ==> ES5)
			{
				// 指定处理js文件
				test: /\.js$/,
				// 指定排除哪些文件夹
				//exclude: /(node_modules|bower_components)/,
				// 指定处理哪些文件夹
				include: [resolve('src')],
				use: {
					loader: 'babel-loader',
					options: {
						// 使用预设包配置常用的babel插件(预设包是包含了多个解析ES6语法的plugin包，但此预设包只能解析部分ES6语法，其他语法使用入口文件引入polyfill来解析)
						presets: ['@babel/preset-env'],
						// 配置预设包不包含的babel插件
						plugins: [
							[
								// 配置babel-plugin-component(与minti-ui相关)
								'babel-plugin-component',
								{
									// 针对mint-ui来实现按需引入打包
									libraryName: 'mint-ui',
									// 自动打包组件对应的样式
									style: true,
								},
							],
						],
					},
				},
			},

			// 处理CSS
			{
				test: /\.css$/,
				// css-loader：将css转移到js文件中
				// style-loader：将js中的css转移到html中的<style>
				// vue-style-loader是对style-loader的增强
				use: ['style-loader', 'css-loader'],
				// use: ['vue-style-loader', 'css-loader'],
			},

			// 处理图片
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				// loader: 'file-loader', // file-loader不能对小图片进行base64处理
				loader: 'url-loader',
				// base64处理规则
				options: {
					// 对小于10k的图片进行处理
					limit: 10 * 1024,

					// static/img：指定路径(相对于output.path)
					// [name]：保留图片的名字
					// .[ext]：保留图片的后缀
					name: 'static/img/[name].[hash:7].[ext]',
				},
			},
		],
	},

	// 插件(值是数组)
	plugins: [
		// 配置插件实例对象

		// 自动引入打包生成的js和css到html
		new HtmlWebpackPlugin({
			// 指定以哪个文件为模板打包
			template: 'index.html',
		}),
		// 自动清除dist文件夹中无用的文件
		new CleanWebpackPlugin(),
		// 搭建vue环境
		new VueLoaderPlugin(),
	],

	// 开发服务器
	devServer: {
		// 端口号
		port: 8080,
		// 自动打开浏览器
		open: true,
		// 不做太多日志输出
		quiet: true,
		// 配置代理(解决404页面)
		proxy: {
			// 匹配以/api开头的请求
			'/api': {
				// 转发的目标地址
				target: 'http://localhost:4000',
				// 在转发请求前去除路径中的/api
				pathRewrite: { '^/api': '' },
				// 支持协议名的跨域
				changeOrigin: true,
			},
		},
		// 请求404时返回index页面
		historyApiFallback: true,
	},

	// 开启source-map(方便寻找错误)
	devtool: 'cheap-module-eval-source-map',

	// 模块引入解析
	resolve: {
		// 指定可以省略的后缀名(若省略了后缀，按从左到右的顺序依次查找)
		extensions: ['.js', '.vue', '.json'],
		// 自定义路径别名
		alias: {
			/* 
            优点：
            1.简化模块路径的编写
            2.加快打包速度
            */
			'@': resolve('src'),
			'@comps': resolve('src/components'),
			// vue$: 'vue/dist/vue.esm.js',
		},
	},
}
