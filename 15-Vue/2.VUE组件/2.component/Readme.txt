1.组件化开发基本流程：
(1) 拆分组件：拆分原页面，定义各个组件文件，并将相关代码放到里面
(2) 导入组件：在主vue文件内分别以标签和import的形式导入局部组件
(3) 注册组件：在主vue文件的export default中注册局部组件
(4) 编写静态组件：使用组件搭建静态页面
(5) 编写动态组件：
    A.初始化动态显示
    B.交互，包括移入移出效果、添加、删除等操作

2.设计数据：
    (1) 数据类型
    (2) 数据名称
    (3) 放在哪个组件

3.模板数据的来源：
    (1) data：自身可变数据
    (2) props：从外部接收的可变数据
    (3) computed：根据已有的data或props数据进行计算产生的数据

4.Vue的组件对象与Vue的关系(通过在组件对象中打印this证明)
    (1) 组件对象不是Vue的实例对象，而是VueComponent的实例
    (2) 组件对象的原型对象是一个vm对象(Vue的实例对象)
    (3) 在组件中读取this.xx的查找顺序：组件对象自身上查找 ==> vm对象上查找 ==> Vue的原型对象上查找
    (4) Vue的原型对象只有一个，而每个组件对象都有其对应的原型对象(通过在this.__proto__和this.__proto__.__proto__挂载属性并在其他组件读取属性证明)
    之前通过自定义组件进行通信是父子组件或祖孙组件间的通信，知道上述结论后，可以先在Vue的原型对象挂在一个vm对象，这样任意组件都能读取到，
    然后在相关组件上分别对该vm进行绑定事件监听和事件分发(this.$vm.$on和this.$vm.$emit和this.$vm.$off)，实现任意组件间的通信。这样vm就叫做全局事件总线(Global Event Bus)

5.事件处理
    (1) 原生DOM事件
        A.绑定事件监听：
            一、事件名(类型)：只有有限的几个，不能自己写
            二、回调函数：接收的的参数是event
        B.用户操作触发事件：
            一、事件名(类型)
            二、数据
    (2) 自定义事件
        A.绑定事件监听：
            一、事件名(类型)：多个，任意起名
            二、回调函数：接收的参数是我们自己指定的数据
        B.触发(emit)/(dispatch)分发事件(编码)：
            一、事件名(类型)：与绑定事件监听的事件名一致
            二、数据：数据自动传递给回调函数

6.路由组件对象的生命周期
    (1) 路由组件对象在访问对应的路由路径时才会创建对象
    (2) 从A组件跳转到B组件：销毁A组件对象，创建B组件对象
    (3) 从B组件跳转到A组件：销毁B组件对象，创建A组件对象
    (4) 从A组件对象跳转到A组件对象(只改变了参数，参考src06中MessageDetail)：A组件对象不会销毁也不会重新创建

-------------------------------- 分隔 --------------------------------

1.组件通信：
    (1) props(父组件向子组件通信)
        A.过程：从父组件将数据传入子组件(:xxx="xxx") => 在子组件声明接收属性(三种方式) => 在子组件使用数据
        B.不能实现子向父的通信，会导致数据混乱
        C.可以借助一个父组件作为中间件实现兄弟组件间的通信，但一般不用此方式
    (2) $emit(子组件向父组件的通信)
        A.过程(参考本示例中的addTodo)：在父组间中定义事件(声明函数) => 绑定事件监听 => 在子组件中分发事件this.$emit('事件名',[,可选传参])
        B.绑定事件监听的两种方式：一、在父组间中给子组件绑定事件监听(@事件名="回调函数") 
                                二、在父组间mounted中绑定事件监听(this.$on('xxx', this.xxx))，注意此时this必须是分发事件的子组件，故需要通过this.$refs.子组件名.$on('xxx', this.xxx)
    (3) $emit(任意组件的通信)
        A.Vue的原型对象只有一个，而每个组件对象都有其对应的原型对象
        B.之前通过自定义组件进行通信是父子组件或祖孙组件间的通信，知道上述结论后，可以先在Vue的原型对象挂在一个vm对象，这样任意组件都能读取到，
        然后在相关组件上分别对该vm进行绑定事件监听和事件分发(this.$vm.$emit、this.$vm.$off和this.$vm.$on)，实现任意组件间的通信。这种vm就叫做全局事件总线(Global Event Bus)
        C.实现过程参考本示例中的deleteTodo
    (4) slot插槽(父组件向子组件通信)
        A.过程(参考本示例中的Footer功能的实现)：在子组件中定义插槽(默认插槽、命名插槽和作用域插槽) => 在父组件中向插槽传入内容
        B.与props不同点：props传的是数据，slot传的是带数据的标签
    (5) vuex
        多组件共享状态(数据的管理)、组件间的关系没有限制、功能比事件总线强大，更适用于vue项目

2.发送ajax请求
    (1) 发送方式
        A.使用vue-resource发送，vue1.x使用广泛
        B.使用axios发送，推荐使用
    (2) 用到的测试链接：https://api.github.com/search/repositories?q=v&sort=stars，q是指定查询关键字，sort=stars是指定按照stars数量排序
    (3) 请求到这个地址的整个操作是跨域的，但github已经解决了跨域的问题
    (4) 解决跨域问题(使用代理服务器web-dev-server)：
        A.过程：使用express搭建服务器模拟出跨域环境 => 在webpack配置文件中配置dev-server(配置proxy) => 将访问文件中的访问地址修改为'/api'开头
        B.配置(web-dev-server从而使用其中的http-proxy-middleware)：
            proxy: {
			// 匹配以/api开头的请求
			'/api': {
				// 转发的目标地址
				target: 'http://localhost:4000',
				// 在转发请求前去除路径中的/api
				pathRewrite: { '^/api': '' },
			    },
                changeOrigin: true
		    }

3.Vue Router
    A.概念：Vue Router是Vue.js官方提供的路由管理器，用于构建单页应用
    B.过程：在在路由文件内引入'vue-router'并声明使用 => 在路由文件内使用new VueRouter()创建路由器 => 在VueRouter()内配置路由 => 在根js文件内注册路由器 => 在页面内使用路由组件标签
    C.配置路由：
        {
            path: '/路由名',
            component: 路由名
        }
    D.注册路由器：
        import router from './router'
	    new Vue({
		    router
	    })
    E.组件标签：
         <router-link>: 用来生成路由链接(可不写)，<router-link to="/xxx">Go to XXX</router-link>
         <router-view>: 用来显示当前路由组件界面(必须写)，<router-view></router-view>
    F.嵌套路由：
    children: [
				{
					// 路径写法一，写出详细路径
					path: '/home/news',
					component: News,
				},
				{
					// 路径写法二，不加'/'，则会自动在当前父路径下查找改路径
					path: 'message',
					component: Message,
				},
				// 默认跳转路由
				{
					// 路径写法三，什么都不写，则会自动跳转到当前父路径
					path: '',
					redirect: '/home/news',
				},
			],


    
-------------------------------- 分隔 --------------------------------

(1)使用await和async报错：
    A.原因：ES6新语法包括两个方面，一是新语法(如const、let)，二是新API(如Map、Promise)，而@babel/preset-env只能编译新语法，不能处理新API，故报错
    B.解决方法：使用@babel/polyfill来提供新API的实现
    C.原理：@babel/polyfill内有两个包，分别是core-js和regenerator-runtime，core-js：提供ES5/ES6/ES7的新API实现；regenerator-runtime：提供ES8的await和async