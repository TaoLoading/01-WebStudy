/*
* 此文件是webpack的配置文件，用于指定webpack去执行哪些任务
* */
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports  = {
  //入口（简化写法）
  entry:['./src/js/index.js','./src/index.html'], //入口
  /*完整写法：
      entry:{
        main:'./src/js/app.js'
      }
    */
  //输出
  output: {
    path: resolve(__dirname, 'dist'), //输出路径
    filename: './js/index.js' //输出的文件名
  },
  //工作模式
  mode: 'development', //配置工作模式

  //配置loader
  /*
    1.所有的laoder都要配置在module对象中的rules属性中
    2.rules是一个数组，数组中的每一个对象就是一个loader
    3.loader特点：下载后无需引入，只需声明
  */
  module: {
    rules: [
      //解析less(不完美)
      {
        test: /\.less$/, //匹配所有的less文件
        use: [
          'style-loader', //用于在html文档中创建一个style标签，将样式“塞”进去。
          'css-loader', //将less编译后的css转换成为CommonJs的一个模块。
          'less-loader' //将less编译为css，但不生成单独的css文件，在内存中。
        ],
      },
      //js语法检查
      {
        test: /\.js$/,  //只检测js文件
        exclude: /node_modules/,  //排除node_modules文件夹
        enforce: "pre",  //提前加载使用
        use: ['eslint-loader']
      },
      //js语法转换+兼容性处理（es6->es5）
      {
        test: /\.js$/, //只检测js文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', {
                  useBuiltIns: 'usage',  // 按需引入需要使用polyfill
                  corejs: { version: 3 }, // 解决不能够找到core-js的问题
                  targets: { // 指定兼容性处理哪些浏览器
                    "chrome": "58",
                    "ie": "9"
                  }}]
            ],
            cacheDirectory: true, // 开启babel缓存
          }
        }
      },
      //使用url-loader处理样式文件中的图片
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,//// 8kb --> 8kb以下的图片会base64处理
              publicPath: 'images/',  // 决定图片的url路径
              outputPath: 'images', // 决定文件本地输出路径
              name: '[hash:5].[ext]' // 修改文件名称 [hash:8] hash值取8位  [ext] 文件扩展名
            },
          },
        ],
      },
      //使用html-loader处理html中的标签资源
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      //使用file-loader处理其他资源
      {
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:5].[ext]'
        }
      }
    ]
  },
  //配置插件
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
    })
  ],
  //配置自动化编译
  devServer: {
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    hot:true //开启热模替换功能 HMR
  },
  //配置devtool实现源文件映射
  devtool:'cheap-module-eval-source-map'
}


