// 使用commonjs模块化语法向外暴露配置对象

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 构造函数
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 定义目录的绝对路径
function resolve(dir) {
	return path.resolve(__dirname, dir)
}

module.exports = {
	// 模式
	// mode: 'development',
	// 入口
	entry: './src/index.js',
	// 出口
	output: {
		path: resolve('dist'),
		filename: 'bundle.js',
	},
	// 模块记载器
	module: {
		rules: [
			// 内部配置loader
			{
				// 处理js文件
				test: /\.js$/,
				// 指定排除不需要处理的文件夹
				// exclude: /(node_modules|bower_components)/,
				// 指定需要处理的文件夹
				include: [resolve('src')],
				use: {
					loader: 'babel-loader',
					options: {
						// 配置预设包(预设包：包含多个常用插件包的大包)
						presets: ['@babel/preset-env'],
						// 配置预设包之外的插件包
						plugins: [],
					},
				},
			},
		],
	},
	// 插件
	plugins: [
		// 配置插件实例对象
		new HtmlWebpackPlugin({
			// 指定打包文件的模板
			template: 'index.html', // 在执行命令所在目录下查找
		}),
		// 清除打包文件夹
		new CleanWebpackPlugin(),
	],
}
