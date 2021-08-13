## 1. 初始化项目
    1). 生成package.json
        yarn init -y
    
    2). 创建入口js: src/index.js
        console.log('Hello Webpack!')
        document.getElementById('root').innerHTML = '<h1>Hello222</h1>'
    
    3). 创建页面文件: index.html
        <div id="root"></div>

## 2. webpack基本使用
    1). 下载依赖包
        yarn add -D webpack webpack-cli
        yarn add -D html-webpack-plugin
        yarn add -D clean-webpack-plugin(自动清除dist文件夹中无用的文件，用法查找github)
    
    2). 创建webpack配置: webpack.config.js
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin')
    
        module.exports = {
          // 模式: 生产环境
          mode: 'production',
          // 入口
          entry: {
            app: path.resolve(__dirname, 'src/index.js')
          },
          // 出口(打包生成js)
          output: {
            filename: 'static/js/[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
          },
          // 模块加载器
          module: {
            rules: [
    
            ]
          },
          // 插件
          plugins: [
            new HtmlWebpackPlugin({
              template: 'index.html',
              filename: 'index.html'
            })
          ]
        }
    
    3). 生成环境打包并运行
        配置打包命令:  "build": "webpack --mode production"
        打包项目: yarn build
        运行打包项目: serve dist

## 3. 开发环境运行
    1). 现在的问题:
        每次修改项目代码后, 必须重新打包, 重新运行
    
    2). 下载依赖包
        yarn add -D webpack-dev-server（某些版本与webpack版本不兼容，报错）
    
    3). 配置开发服务器
        devServer: {
          open: true, // 自动打开浏览器
          quiet: true, // 不做太多日志输出
        },
    
    4). 配置开启source-map调试
    	因为运行的是打包文件，故程序运行出错时报错只会报打包文件，而我们希望看到的是源文件。通过source-map可以建立打包文件与源文件间的映射关系
        devtool: 'cheap-module-eval-source-map',
    
    5). 开发环境运行
        配置命令: "dev": "webpack-dev-server --mode development"
        执行命令: yarn dev

## 4. 打包处理 ES6/CSS/图片
    1). 处理ES6
        a. 下载依赖包
            yarn add -D babel-loader @babel/core @babel/preset-env
        b. 配置
            {
              test: /\.js$/,
              //exclude: /(node_modules|bower_components)/,
              include: path.resolve(__dirname, 'src'),
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
    
    2). 处理CSS
        a. 下载依赖包
            yarn add -D css-loader style-loader
        b. 配置
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
            }
    
    3). 处理图片
        a. 下载依赖包
            yarn add -D url-loader@2.3.0 file-loader@4.3.0
        b. 配置
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
              }
            }
    4). 测试
        a. 添加图片: src/assets/imgs/logo.png
        b. 添加css: src/assets/css/my.css
            img {
              width: 200px;
              height: 200px;
            }
        c. index.js
            import logo from './assets/imgs/logo.png'
            import  './assets/css/my.css'
    
            const image = new Image()
            image.src = logo
            document.body.appendChild(image)
            document.getElementById('root').innerHTML = '<h1>Hello222</h1>'

## 5. 搭建vue的环境
    0). 文档:
        https://vue-loader.vuejs.org/zh/
    
    1). 下载依赖包:
        yarn add vue
        yarn add -D vue-loader vue-template-compiler
    
    2). 配置
        const VueLoaderPlugin = require('vue-loader/lib/plugin')
    
        {
          test: /\.vue$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'vue-loader'
        }
    
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        }
    
        new VueLoaderPlugin()
    
        // 引入模块的解析
        resolve: {
          extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
          alias: { // 路径别名(简写方式)
            'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配
          }
        }
    
    3). 编码: 
        src/App.vue
        src/index.js

## 6. 解决开发环境ajax请求跨域问题
    1). 利用webpack-dev-server进行请求代理转发
        webpack-dev-server内部利用http-proxy-middle包对特定请求进行转发操作
    2). 配置:
        devServer: {
          proxy: {
            // 处理以/api开头路径的请求
            // '/api': 'http://localhost:4000'
            '/api': {
              target: 'http://localhost:4000', // 转发的目标地址
              pathRewrite: {
                '^/api' : ''  // 转发请求时去除路径前面的/api
              },
              changeOrigin: true, // 支持跨域
            }
          }
        }

## 7. 配置async/await的编译环境
    1). 下载包
        yarn add @babel/polyfill
    2). 配置方式一
    	入口文件(index.js)中直接引入，占用空间大
    	import '@babel/polyfill'
    3). 配置方式二
    	在webpack配置文件中进行配置，按需打包，占用空间小
        presets: [
          ['@babel/preset-env', {
            useBuiltIns: 'usage', // useBuiltIns内填写用到的包
            'corejs': 2 // 处理一些新语法的实现
          }]
        ]

## 8. 解决mint-ui按需引入配置异常的问题
    1). 文档上的配置
        "plugins": [
          ["component", [
            {
              "libraryName": "mint-ui",
              "style": true
            }
          ]]
        ]
    2). 异常信息:  
        Error: .plugins[0][1] must be an object, false, or undefined
    3). 原因:
        文档编写时, 是根据老的babel版本编写的, 新版本的babel配置有变化
        以前是数组, 现在只能是对象
    4). 修正:
        "plugins": [
          ["component", {
              "libraryName": "mint-ui",
              "style": true
          }]
        ]

## 9. 解决history模式路由请求404的问题
    devServer: historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    output: publicPath: '/', // 引入打包的文件时路径以/开头





bable本身不编译ES6语法

bable需要基于它的插件(plugin)来做ES6语法的编译

每个语法都有一个对应的bable plugin来编译对应的语法

一个bable preset包是包含多个常用的bable plugin的集合包

好处：便于管理配置