// 使用commonjs模块化语法向外暴露配置对象

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 构造函数
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	// 模式
	mode: 'development',
	// 入口
	entry: './src/index.js',
	// 出口
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	// 模块记载器
	module: {
		rules: [
			// 内部配置loader
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
