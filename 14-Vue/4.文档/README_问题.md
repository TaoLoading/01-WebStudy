## 1. 2种定义组件方式的比较?
  1). 非单文件组件: Vue.component()
      可以直接运行
      编码麻烦: 模板编写没有提示/也不直观
  2). 单文件组件: xxx.vue
      模板编写有提示/也比较直观
      需要先编译好后才能运行

## 2. 区别webpack和webpack-cli?
  1). webpack: 打包/编译代码的
  2). webpack-cli: 提供启动打包程序的命令 webpack命令

## 3. webpack的几个基本配置项?
  1). mode
  2). entry
  3). output
  4). module & rules
  5). plugins
  6). devServer

## 4. 区别webpack的开发环境与生产环境?
  1). 开发环境运行: 
      webpack-dev-server --mode development
      1). 在内存中打包, 生成内存中的打包文件
      2). 启动服务器运行  ---可以通过浏览器访问

  2). 生产环境打包并运行
      wepack --mode poroduction
      1). 在内存中打包, 生成内存中的打包文件
      2). 将打包文件保存到本地(硬盘上)    ---还不可以通过浏览器访问
      serve dist
      1). 将本地打包文件加载到内存中
      2). 启动服务器运行   ---可以通过浏览器访问


## 5. 说几个webpack中常用的工具包?
    webpack-dev-server
    babel-loader
    css-loader
    style-loader
    file-loader
    url-loader
    html-webpack-plugin
    clean-webpack-plugin

## 6. 区别babel的plugin(插件)与preset(预设)?
    babel本身不能编译ES6的语法
    babel需要基于它的plugin来做ES语法的编译
    每个语法都一个对应的babel plugin包来编译对应的语法
    一个babel preset包是包含多个常用的babel plugin的集合包
    有什么好处: 便于下载配置

## 7. webpack的resolve配置能做什么?
    extends: 指定可以省略的模块文件后缀名
    alias: 引入模块的路径别名  ==> 简化编码 / 加快打包

## 8. 如何配置vue单文件组件开发的环境?
    下载包: vue / vue-loader / vue-template-compiler
    配置:
        vue-loader
        VueLoaderPlugin
        vue-style-loader

## 9. 自定义vue开发环境有没有遇到过什么问题?
    编码:
        components: {App},
        template: '<App/>'
    问题: 运行报错, 提示当前使用vue版本只是一个运行时版本, 不带模板编译器
    原因:
        template的编译需要使用vue的编译模板的代码
        它没有使用vue-template-compiler包
    解决:
        办法1: 配置指定使用vue带编译器的版本, resolve.alias                    vue-cli2
        办法2: 编码使用render  (内部使用vue-template-compiler包进行预编译模板)   vue-cli3
    哪种办法更好: 办法2
        打包文件更小


## 10. 组件化开发的基本流程和2个重要问题?
    拆分组件: 拆分界面, 定义组件
    静态组件: 使用组件搭建静态界面
    动态组件:
        初始化动态显示
        交互: 与用户/后台
    2个重要问题?
        数据定义在哪个组件?  哪个组件需要还是哪些组件
        更新数据的方法定义在哪个组件? 数据在哪个组件方法就定义在哪个组件
    设计数据的3个问题?
        类型
        名称 
        在哪个组件

## 11. 模板中需要显示的数据来源有哪3个?
    data: 自身可变数据
    props: 外部(父组件)传入的数据
    computed: 根据已有data/props/其它的computed进行计算产生的可变数据

## 12. 列出 vue 常用的配置选项?
    el
    data
    props
    computed
    watch
    methods
    filters
    directives
    components

## 13. 事件处理的理解
    1). 原生DOM事件
        * 绑定事件监听
            * 事件名(类型): 只有有限的几个, 不能随便写
            * 回调函数
        * 用户操作触发事件(event)
            * 事件名(类型)
            * 数据
    2). 自定义事件
        * 绑定事件监听
            * 事件名(类型): 任意
            * 回调函数: 通过形参接收数据, 在函数体处理事件
        * 触发(emit)/分发(dispatch)事件(编码)
            * 事件名(类型): 与绑定的事件监听的事件名一致
            * 数据: 会自动传递给回调函数

## 14. Vue的组件对象与Vue是关系
    组件对象不是Vue的实例对象, 它是VueComponent的实例
    组件对象的原型对象是一个vm对象(Vue的实例对象)
    在组件中读取: this.xxx
        组件对象自身上查
        去原型对象也就是vm对象上查找
        去Vue的原型对象
    Vue的原型对象只有一个
    组件对象的原型是每个组件对象都有自己的
    可以在Vue的原型对象添加一个东西 ==> 所有组件对象都可见

## 15. 如何理解全局事件总线?
    一个对象
    包含一系列事件处理的功能方法
        绑定事件监听: on(eventName, listener)
        分发事件: emit(eventName, data)
        解绑事件监听: off(eventName)
    在vue中利用此vm作为事件总线能实现任意组件间通信

## 16. 组件间的通信方式有哪些?
    0). 组件间的关系
        父子: 父 ==> 子  / 子 ==> 父
        祖孙: 祖 ==> 孙  /  孙 ==> 祖 
        兄弟
        其它
    1). props:
        父子组件间通信的基本方式
        属性值的2大类型:
            一般/非函数: 父组件-->子组件
            函数: 子组件-->父组件
        问题: 
            隔层组件间传递: 必须逐层传递(麻烦)
            兄弟组件间: 必须借助父组件(麻烦)
    2). vue自定义事件
        给子组件标签绑定事件监听
        子组件向父组件的通信方式
        功能类似于function props
        不适合隔层组件和兄弟组件间的通信
    3). 全局事件总线
        利用vm对象的$on()/$emit()/$off()
        利用vm对象是组件对象的原型对象
        创建vm对象作为全局事件总线对象保存到Vue的原型对象上, 所有的组件对象都可以直接可见:
            Vue.prototype.$bus = this / new Vue()
            任意组件A可以通过this.$bus.$on()绑定监听接收数据
            任意组件B可以通过this.$bus.$emit()分发事件, 传递数据
    4). slot
        父组件向子组件通信
        通信是带数据的标签
        注意: 标签是在父组件中解析
    5). vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比事件总线强大, 更适用于vue项目

## 17. 如何与后台通信
    1). 使用什么发ajax请求?
        vue-resource   vue1.x使用
        axios vue2.x使用
    2). 在什么时候发请求?
        mounted()中
        事件监听回调函数或相关函数中

## 18. 代理服务器的理解和使用?
    1). 代理服务器
        能对请求进行转发的工具包
        开发环境: web-dev-server  ==> http-proxy-middleware
        生产环境: ngix
    2). 配置
        devServer: {
          proxy: {
            '/api': {
              target: 'http://localhost:4000',
              pathRewrite: {
                '^/api' : '' 
              },
              changeOrigin: true
            }
          }
        }


## ES6+的打包处理
    新的语法: const / let / 箭头函数 / ...
    新的API: Map / Promise / arr.map()/...
    @babel/preset-env它只能编译新的语法, 不能处理的新的API:
    可以利用@babel/polyfill来提供新API的实现
        core-js: 提供es5/es6/es7的新的API的实现
        regenerator-runtime: es8的async/await

## 路由组件对象的创建与销毁
    路由组件对象在访问对应的路由路径时才会创建对象
    从A组件跳转到B组件: 销毁A组件对象, 创建B组件对象
    从B组件再跳转回到A: 销毁B组件对象, 创建A组件对象
    从A组件跳转到A组件(只是改变了参数): A组件对象不会销毁重新创建

## 区别hash与history路由
    hash刷新: http://localhost:8081/#/about
        请求后台: http://localhost:8081/  ==> 返回index.html
        注意: #/about不会交给服务器
        浏览器得到index页面后就会得到关联的js
        js中的路由代码就会将#/about解析为前台路由路径

    history刷新: http://localhost:8081/about
        请求后台: http://localhost:8081/about ==> 后台处理不了, 返回404
        解决思路: 在某个路由路径下刷新服务器能返回index页面
        配置: devServer: historyApiFallback: true  //  任意的 404 响应都被替代为 index.html

## mint-ui按需引入配置异常的问题
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