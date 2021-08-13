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

7.向路由组件传递参数：
    (1) 参数类型：
        A.params参数：路径中可变参数即params参数，由于是可变的故在定义params参数时要加':'
        B.query参数：路径中'?之后的
    (2) 传递参数方式：
        A.使用props
            一、使用 props:true 可将params参数映射为组件属性
            二、使用 props:(route)=>({xx:xx}) 可映射params参数和query参数
        B.使用router-view+props
            一、直接在<router-view>标签中传递数据，如<router-view msg="abc"></router-view>，则所有它管理的路由组件都能接收到msg属性
        C.两种传递参数方式都需要在目标组件中使用props接收传递过来的参数

8.history模式下点击任意一个路由后刷新页面出现404
    (1) 原因：
        A.hash模式下，点击任意一个路由后刷新页面不会出现404，
        因为虽然刷新页面时路径为http://localhost:8080/#/xxx，但请求服务器的路径为http://localhost:8080，返回index.html，
        浏览器通过解析后就会得到路由解析代码，然后将'/#/xxx'作为前台路由路径解析，显示出对应的界面
        B.history模式下，会出现404页面，
        因为刷新页面时路径为http://localhost:8080/xxx，同时history模式下会将这个路径请求服务器，
        也就是将本来应该作为前台路由路径的'/xxx'作为后台路由路径发送给了服务器，服务器没有对应的资源，于是出现404
    (2) 解决：
        A.解决思路：在任意路由下刷新服务器都能返回index页面
        B.解决方法：配置webpack中的dev-server，historyApiFallback: true

9.history模式下点击任意一个路由的子路由后刷新页面报错
    (1) 原因：
        A.index.html文件中可能引入了某些外部文件，而引用链接是采用'./xxx'的绝对路径形式(如引入bootstrap)，
        而此时由于处于路由的子路由，'./'形式会在上一级路径即第一级路由下沿着该绝对文件去寻找引入文件，由于找不到，故报错
    (2) 解决：
        A.在引入文件时去掉'.'
        B.在配置webpack中的output，publicPath: '/'

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
        然后在相关组件上分别对该vm进行绑定事件监听和事件分发(this.$vm.$emit('事件名',回调函数)、this.$vm.$off和this.$vm.$on)，实现任意组件间的通信。这种vm就叫做全局事件总线(Global Event Bus)
        C.实现过程参考本示例中的deleteTodo
    (4) slot插槽(父组件向子组件通信)
        A.过程(参考本示例中的Footer功能的实现)：在子组件中定义插槽(默认插槽、命名插槽和作用域插槽) => 在父组件中向插槽传入内容(给标签加上solt)
        B.与props不同点：props传的是数据，slot传的是带数据的标签
        C.默认插槽中如果定义的内容，当没有向插槽传值时则显示默认内容，当向插槽传值时显示传入的内容
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
    (1).概念：Vue Router是Vue.js官方提供的路由管理器，用于构建单页应用
    (2).过程：在在路由文件内引入'vue-router'并声明使用 => 在路由文件内使用new VueRouter()创建路由器 => 在VueRouter()内配置路由 => 在根js文件内注册路由器 => 在页面内使用路由组件标签
    (3).配置路由：
        {
            path: '/路由名',
            component: 路由名
        }
    (4).注册路由器：
        import router from './router'
	    new Vue({
		    router
	    })
    (5).组件标签：
         <router-link>: 用来生成路由链接(可不写)，<router-link to="/xxx">Go to XXX</router-link>
         <router-view>: 用来显示当前路由组件界面(必须写)，<router-view></router-view>
    (6).嵌套路由：
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

4.Vuex
    (1) 概念：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
        简单的说，vuex就是对vue应用中多个组件的共享状态进行集中式的管理(读/写)。
    (2) 核心API
        A.state：相当于data
        B.getters：包含n个基于state数据getter计算属性的方法的对象
        C.mutations：包含n个用于直接更新状态数据的方法的对象
        D.actions：包含n个用于间接更新状态数据的方法的对象
        E.modules：将store对象分割为多个module，每个module都包含自己的state、mutations、actions、getters，防止store对象过于臃肿
    (3) 区分actions(dispatch)和mutations(commit)的使用
        A.actions(dispatch)：除改变数据外还有其他操作(如逻辑判断的等)以及异步代码
        B.mutations(commit)：仅改变数据
    (4) 使用
        A.配置store。store是组件与vuex通信的一个桥梁对象
          export default new Vue.Store(){
            state,
	          mutations,
	          actions,
	          getters,
          }
        B.在入口文件中引入并配置store。配置后所有组件都可以通过$store来访问store对象
        C.分别配置state、actions、mutations、getters
        D.在vue文件内编写页面以及操作逻辑。当直接操作数据时调用commit()，当间接操作数据时调用dispatch()


    
-------------------------------- 分隔 --------------------------------

(1)使用await和async报错：
    A.原因：ES6新语法包括两个方面，一是新语法(如const、let)，二是新API(如Map、Promise)，而@babel/preset-env只能编译新语法，不能处理新API，故报错
    B.解决方法：使用@babel/polyfill来提供新API的实现
    C.原理：@babel/polyfill内有两个包，分别是core-js和regenerator-runtime，core-js：提供ES5/ES6/ES7的新API实现；regenerator-runtime：提供ES8的await和async