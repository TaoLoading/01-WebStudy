// 引入插件
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 指定路径函数 (简化操作 path 路径)
function resolve(dir) {
	// 返回指定路径的绝对路径
	return path.resolve(__dirname, dir)
}

module.exports = {
	// 模式
	mode: 'development',

	// 入口 (值可以是字符串或对象)
	entry: './src/index.js',
	// 对象形式：
	// entry: {
	// 	main: './src/index.js'
	// },

	// 出口 (值只能是对象)
	output: {
		// 指定打包到哪个文件，绝对路径
		// 所有打包生成文件的基础路径
		path: resolve('dist'),
		// 指定打包生产文件的名字
		filename: '[name]bundle.js', // [name] 是个占位符，对应 entry 中的'main'
		// 生成的引用路径左边都加一个'/'
		publicPath: '/'
	},

	// 模块加载器 (值是对象)
	module: {
		rules: [
			// 内部配置 loader
			// 多个 loader 执行顺序是从下往上，从右往左

			// 处理 vue 文件
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},

			// 处理 ES6 语法 (ES6 ==> ES5)
			{
				// 指定处理 js 文件
				test: /\.js$/,
				// 指定排除哪些文件夹
				//exclude: /(node_modules|bower_components)/,
				// 指定处理哪些文件夹
				include: [resolve('src')],
				use: {
					loader: 'babel-loader',
					options: {
						// 使用预设包配置常用的 babel 插件 
						// 预设包是包含了多个解析 ES6 语法的 plugin 包，但此预设包只能解析部分 ES6 语法，其他语法使用入口文件引入 polyfill 来解析
						presets: ['@babel/preset-env'],
						// 配置预设包不包含的 babel 插件
						plugins: [
							[
								// 配置 babel-plugin-component，指定对特定库实现按需引入
								'babel-plugin-component',
								{
									// 指定库名
									libraryName: 'mint-ui',
									// 自动打包组件对应的样式
									style: true
								}
							]
						]
					}
				}
			},

			// 处理 CSS
			{
				test: /\.css$/,
				// css-loader：将 css 转移到 js 文件中
				// style-loader：将 js 中的 css 转移到 html 中的<style>
				// vue-style-loader 是对 style-loader 的增强
				use: ['style-loader', 'css-loader']
				// use: ['vue-style-loader', 'css-loader']
			},

			// 处理图片
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				// loader: 'file-loader', // file-loader 不能对小图片进行 base64 处理
				loader: 'url-loader',
				// base64 处理规则
				options: {
					// 对小于 10k 的图片进行处理
					limit: 10 * 1024,

					// static/img：指定路径(相对于output.path)
					// [name]：保留图片的名字
					// .[ext]：保留图片的后缀
					name: 'static/img/[name].[hash:7].[ext]'
				}
			}
		]
	},

	// 插件
	plugins: [
		// 配置插件实例对象

		// 自动引入打包生成的 js 和 css 到 html
		new HtmlWebpackPlugin({
			// 指定以哪个文件为模板打包
			template: 'index.html',
		}),
		// 自动清除 dist 文件夹中无用的文件
		new CleanWebpackPlugin(),
		// 搭建 vue 环境
		new VueLoaderPlugin()
	],

	// 开发服务器
	devServer: {
		// 端口号
		port: 8080,
		// 自动打开浏览器
		open: true,
		// 不做太多日志输出
		quiet: true,
		// 配置代理 (解决 404 页面)
		proxy: {
			// 匹配以/api开头的请求
			'/api': {
				// 转发的目标地址
				target: 'http://localhost:4000',
				// 在转发请求前去除路径中的/api
				pathRewrite: { '^/api': '' },
				// 支持协议名的跨域
				changeOrigin: true
			}
		},
		// 请求 404 时返回 index 页面
		historyApiFallback: true
	},

	// 开启 SourceMap
	devtool: 'cheap-module-eval-source-map',

	// 模块引入解析
	resolve: {
		// 指定可以省略的后缀名 (若省略了后缀，按从左到右的顺序依次查找)
		extensions: ['.js', '.vue', '.json'],
		// 自定义路径别名
		alias: {
			/**
			 * 优点：
			 * 1. 简化模块路径的编写
			 * 2. 加快打包速度
			 */
			'@': resolve('src'),
			'@comps': resolve('src/components'),
			// vue$: 'vue/dist/vue.esm.js'
		}
	}
}
