// 引用gulp模块
const gulp = require('gulp')
// 引用gulp-htmlmin插件用于压缩html代码
const htmlmin = require('gulp-htmlmin')
// 引用gulp-file-include插件用于抽取公共代码
const fileinclude = require('gulp-file-include')
// 引用gulp-less插件用于转换less为css
const less = require('gulp-less')
// 引入gulp-csso插件用于压缩css代码
const csso = require('gulp-csso')
// 引入gulp-babel插件用于es6语法为es5语法
const babel = require('gulp-babel')
// 引入gulp-uglify插件用于压缩js代码
const uglify = require('gulp-uglify')

// 使用gulp.task()建立任务
// 传入两个参数：1.任务的名称 2.任务的回调函数

// 借助gulp-cil工具执行代码：gulp 任务名
// 若不加任务名，则会执行default任务

gulp.task('first', () => {
	console.log('第一个gulp任务')
	// 使用gulp.src()获取要处理的文件
	gulp.src('./src/css/base.css')
		// 使用gulp.dest()将文件输出要对应的位置
		.pipe(gulp.dest('dist/css'))
})

// html任务
gulp.task('htmlmin', () => {
	gulp.src('./src/*.html')
		// 抽取公共代码
		.pipe(fileinclude())
		// html代码压缩
		.pipe(htmlmin({ collapseWhitespace: true })) // collapseWhitespace即询问是否压缩空格
		.pipe(gulp.dest('dist'))
})

// css任务
gulp.task('cssmin', () => {
	// gulp.src('./src/css/*.less') // 传入单个文件
	gulp.src(['./src/css/*.less', './src/css/*.css']) // 通过传入数组的方式来传入多个文件
		// 转换less语法为css语法
		.pipe(less())
		// css代码压缩
		.pipe(csso())
		.pipe(gulp.dest('dist/css'))
})

// js任务
gulp.task('jsmin', () => {
	gulp.src('./src/js/*.js')
		// 转换es6语法为es5语法
		.pipe(babel({ presets: ['@babel/env'] })) // @babel/env可以判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
		// 压缩js代码
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
})

// 复制文件夹
gulp.task('copy', () => {
	gulp.src('./src/images/*')
		// 赋值images文件夹
		.pipe(gulp.dest('dist/images'))

	gulp.src('./src/lib/*')
		// 赋值lib文件夹
		.pipe(gulp.dest('dist/lib'))
})

// 构建任务（执行构建任务，使得其他任务依次执行）
gulp.task('default', ['htmlmin', 'cssmin', 'jsmin', 'copy'])
