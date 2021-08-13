# 自定义Vue开发环境
## 1. 搭建基本开发环境
    1). 下载依赖包
        yarn add -D webpack webpack-cli
        yarn add -D html-webpack-plugin
        yarn add -D webpack-dev-server
        yarn add -D babel-loader @babel/core @babel/preset-env
        yarn add -D css-loader style-loader
        yarn add -D url-loader@2.3.0 file-loader@4.3.0
    
    2). webpack的基本配置: webpack.config.js
        module.exports = {
          mode: 'production|development'
          entry: {

          },
          output: {

          },
          module: {
            rules: [
                
            ]
          },
          plugins: [

          ],
          devServer: {

          },
          devtool: ''
        }

    3). 区分使用生产环境与开发环境
        使用生产环境:
            npm run build   ==> webpack
            1). 在内存中进行编译打包, 生成内存中的打包文件
            2). 保存到本地(在本地生成打包文件)   ===> 此时还不能通过浏览器来访问, 需要启动服务器运行
        使用开发环境
            npm run dev   ==> webpack-dev-server
            1). 在内存中进行编译打包, 生成内存中的打包文件
            2). 启动服务器, 运行内存中的打包文件(不生成本地打包文件)   ===> 可以通过浏览器虚拟路径访问

## 2. 搭建Vue的开发环境
    1). 配置处理.Vue组件文件的loader和plugin
    2). 配置使用vue-style-loader替换style-loader
    3). 解决无法编译vue模板的错误
        原因: 默认引入的vue是不带编译器的版本, 无法对template配置指定模板进行编译
        解决: 配置模块别名来指定引入vue带编译器的版本
    4). 配置省略模块后缀名(.js/.vue/.json)

# 组件化
## 1. vue单文件组件
    <template>
      <div>xxx</div>
    </template>
    <script>
      export default {
        props: []/{}
        data(){},
        computed: {}
        methods: {},
        watch: {}
        filters: {}
        directives: {}
        components: {}
      }
    </script>
    <style scoped>
    </style>

## 2. 组件化编码的
    基本流程
        1). 拆分界面, 抽取组件
        2). 编写静态组件
        3). 编写动态组件
            初始化数据, 动态显示初始化界面
            实现与用户交互功能

    设计data
        类型: [{id: 1, title: 'xxx', completed: false}]
        名称: todos
        位置: 如果只是哪个组件用, 交给它, 如果是哪些组件用, 交给共同的父组件
    
    关于状态数据的更新
        data数据定义在哪个组件, 更新数据的行为就定义在哪个组件
        如果子组件要更新父组件的数据, 调用父组件的更新函数来更新父组件的数据
        一个组件接收属性数据不要直接修改, 只是用来读取显示的
    
    相关问题:
        组件的data配置为什么只能是函数, 不能是对象?
            保证同一个组件的多个实例对象的data对象不是共用的, 而是各自自己的data对象
        组件对象与Vue是什么关系?
            所有组件对象的原型对象都是一个vm对象
            所有组件对象都能看到定义在Vue原型对象上的属性或方法

## 3. 组件间通信
    1). 组件通信的5种方式
        props
        vue的自定义事件
        全局事件总线
        slot
        vuex(后面单独讲)
    
    2). props:
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
        问题: 不适合隔层组件和兄弟组件间的通信
    
    3). 全局事件总线
        利用vm对象的$on()/$emit()/$off()
        利用组件对象的原型对象是vm对象, 组件对象能直接看到Vue原型对象上的属性
        创建vm对象作为全局事件总线对象保存到Vue的原型对象上, 所有的组件对象都可以直接可见:
            Vue.prototype.$bus = new Vue()   // 也可以直接利用最外层的vm对象
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

## 4. 自定义消息订阅与发布
    1). 相关语法
        a. PubSub: 包含所有功能的订阅/发布消息的管理者对象
        b. token PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
        c. PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
        d. PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
        e. PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅
    2). 内部容器结构
        {
            "add": {
                uid_1: callback1,
                uid_2: callback2
            },
            "delete": {
                uid_3: callback3
            }
        }

## 5. 自定义事件总线
    1). 相关语法
        a. EventBus: 包含所有功能的全局事件总线对象
        b. EventBus.on(eventName, listener): 绑定事件监听
        c. EventBus.emit(eventName, data): 分发事件
        d. EventBus.off(eventName): 解绑事件监听
    2). 内部容器结构
        {
            "add": [callback1, callback2],
            "delete": [callback3]
        }

## 6. 与后台进行通信
    1). 使用什么发ajax请求?
        vue-resource   vue1.x使用
        axios vue2.x使用
    2). 在什么时候发请求?
        mounted()中
        事件监听回调函数或相关函数中

## 7. vue UI组件库
    常用的UI组件库
        PC: Element / iview /
        Mobile: mint-ui / vant-ui / cube-ui
    mint-ui的使用
        根据官方文档使用
        配置实现按需引入打包
