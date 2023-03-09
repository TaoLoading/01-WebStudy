## 组件化开发基本流程：

1. 拆分组件：拆分原页面，定义各个组件文件，并将相关代码放到里面
2. 导入组件：在主 vue 文件内分别以标签和 import 的形式导入局部组件
3. 注册组件：在主 vue 文件的 export default 中注册局部组件
4. 编写静态组件：使用组件搭建静态页面
4. 编写动态组件：
   * 初始化动态显示
   * 交互，包括移入移出效果、添加、删除等操作

## 设计数据：
1. 数据类型
2. 数据名称
3. 放在哪个组件

## 模板数据的来源：
1. data：自身可变数据
2. props：从外部接收的可变数据
3. computed：根据已有的 data 或 props 数据进行计算产生的数据

## Vue 的组件对象与 Vue 的关系 (通过在组件对象中打印 this 证明)
1. 组件对象不是 Vue 的实例对象，而是 VueComponent 的实例
2. 组件对象的原型对象是一个 vm 对象 (Vue 的实例对象)
3. 在组件中读取 this.xx 的查找顺序：组件对象自身上查找 ==> vm 对象上查找 ==> Vue 的原型对象上查找
4. Vue 的原型对象只有一个，而每个组件对象都有其对应的原型对象 (通过在 this.__proto__和 this.__proto__.__proto__挂载属性并在其他组件读取属性证明)
    之前通过自定义组件进行通信是父子组件或祖孙组件间的通信，知道上述结论后，可以先在 Vue 的原型对象挂在一个 vm 对象，这样任意组件都能读取到，
    然后在相关组件上分别对该 vm 进行绑定事件监听和事件分发 (this.$vm.$on 和 this.$vm.$emit 和 this.$vm.$off)，实现任意组件间的通信。这样 vm 就叫做全局事件总线 (Global Event Bus)

## 事件处理
1. 原生 DOM 事件
  A.绑定事件监听：
      一、事件名 (类型)：只有有限的几个，不能自己写
      二、回调函数：接收的的参数是 event
  B.用户操作触发事件：
      一、事件名 (类型)
      二、数据
2. 自定义事件
  A.绑定事件监听：
      一、事件名 (类型)：多个，任意起名
      二、回调函数：接收的参数是我们自己指定的数据
  B.触发 (emit)/(dispatch) 分发事件 (编码)：
      一、事件名 (类型)：与绑定事件监听的事件名一致
      二、数据：数据自动传递给回调函数

## 路由组件对象的生命周期
1. 路由组件对象在访问对应的路由路径时才会创建对象
2. 从 A 组件跳转到 B 组件：销毁 A 组件对象，创建 B 组件对象
3. 从 B 组件跳转到 A 组件：销毁 B 组件对象，创建 A 组件对象
4. 从 A 组件对象跳转到 A 组件对象 (只改变了参数，参考 src06 中 MessageDetail)：A 组件对象不会销毁也不会重新创建

## 向路由组件传递参数：
1. 参数类型：
   * params 参数：路径中可变参数即 params 参数，由于是可变的故在定义 params 参数时要加':'
   * query 参数：路径中'?之后的
2. 传递参数方式：
   * 使用 props
     1. 使用 props:true 可将 params 参数映射为组件属性
     2. 使用 props:(route)=>({xx:xx}) 可映射 params 参数和 query 参数
   * 使用 router-view+props
     2. 直接在<router-view>标签中传递数据，如<router-view msg="abc"></router-view>，则所有它管理的路由组件都能接收到 msg 属性
   * 两种传递参数方式都需要在目标组件中使用 props 接收传递过来的参数

## history 模式下点击任意一个路由后刷新页面出现 404
1. 原因：
   * hash 模式下，点击任意一个路由后刷新页面不会出现 404，
        因为虽然刷新页面时路径为 http://localhost:8080/#/xxx，但请求服务器的路径为 http://localhost:8080，返回 index.html，
        浏览器通过解析后就会得到路由解析代码，然后将'/#/xxx'作为前台路由路径解析，显示出对应的界面
   * history 模式下，会出现 404 页面，
        因为刷新页面时路径为 http://localhost:8080/xxx，同时 history 模式下会将这个路径请求服务器，
        也就是将本来应该作为前台路由路径的'/xxx'作为后台路由路径发送给了服务器，服务器没有对应的资源，于是出现 404
2. 解决：
   * 解决思路：在任意路由下刷新服务器都能返回 index 页面
   * 解决方法：配置 webpack 中的 dev-server，historyApiFallback: true

## history 模式下点击任意一个路由的子路由后刷新页面报错
1. 原因：
    index.html 文件中可能引入了某些外部文件，而引用链接是采用'./xxx'的绝对路径形式 (如引入 bootstrap)，
    而此时由于处于路由的子路由，'./'形式会在上一级路径即第一级路由下沿着该绝对文件去寻找引入文件，由于找不到，故报错
2. 解决：
    * 在引入文件时去掉'.'
    * 在配置 webpack 中的 output，publicPath: '/'

-------------------------------- 分隔 --------------------------------

## 组件通信：
1. props(父组件向子组件通信)
   1. 过程：从父组件将数据传入子组件 (:xxx="xxx") => 在子组件声明接收属性 (三种方式) => 在子组件使用数据
   2. 不能实现子向父的通信，会导致数据混乱
   3. 可以借助一个父组件作为中间件实现兄弟组件间的通信，但一般不用此方式
2. $emit(子组件向父组件的通信)
   1. 过程 (参考本示例中的 addTodo)：在父组间中定义事件 (声明函数) => 绑定事件监听 => 在子组件中分发事件 this.$emit('事件名',[,可选传参])
   2. 绑定事件监听的两种方式：
      * 一、在父组间中给子组件绑定事件监听 (@事件名="回调函数")
      * 在父组间 mounted 中绑定事件监听 (this.$on('xxx', this.xxx))，注意此时 this 必须是分发事件的子组件，故需要通过 this.$refs.子组件名.$on('xxx', this.xxx)
3. $emit(任意组件的通信)
   1. Vue 的原型对象只有一个，而每个组件对象都有其对应的原型对象
   2. 之前通过自定义组件进行通信是父子组件或祖孙组件间的通信，知道上述结论后，可以先在 Vue 的原型对象挂在一个 vm 对象，这样任意组件都能读取到，
        然后在相关组件上分别对该 vm 进行绑定事件监听和事件分发 (this.$vm.$emit('事件名',回调函数)、this.$vm.$off 和 this.$vm.$on)，实现任意组件间的通信。这种 vm 就叫做全局事件总线 (Global Event Bus)
   3. 实现过程参考本示例中的 deleteTodo
4. slot 插槽 (父组件向子组件通信)
   1. 过程 (参考本示例中的 Footer 功能的实现)：在子组件中定义插槽 (默认插槽、命名插槽和作用域插槽) => 在父组件中向插槽传入内容 (给标签加上 slot)
   2. 与 props 不同点：props 传的是数据，slot 传的是带数据的标签
   3. 默认插槽中如果定义的内容，当没有向插槽传值时则显示默认内容，当向插槽传值时显示传入的内容
5. vuex
   多组件共享状态 (数据的管理)、组件间的关系没有限制、功能比事件总线强大，更适用于 vue 项目

## 发送 Ajax 请求
1. 发送方式
        A.使用 vue-resource 发送，vue1.x 使用广泛
        B.使用 axios 发送，推荐使用
2. 用到的测试链接：https://api.github.com/search/repositories?q=v&sort=stars，q 是指定查询关键字，sort=stars 是指定按照 stars 数量排序
3. 请求到这个地址的整个操作是跨域的，但 github 已经解决了跨域的问题
4. 解决跨域问题 (使用代理服务器 web-dev-server)：
        A.过程：使用 express 搭建服务器模拟出跨域环境 => 在 webpack 配置文件中配置 dev-server(配置 proxy) => 将访问文件中的访问地址修改为'/api'开头
        B.配置 (web-dev-server 从而使用其中的 http-proxy-middleware)：
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

## Vue Router
1. 概念：Vue Router 是 Vue.js 官方提供的路由管理器，用于构建单页应用
2. 过程：在在路由文件内引入'vue-router'并声明使用 => 在路由文件内使用 new VueRouter() 创建路由器 => 在 VueRouter() 内配置路由 => 在根 js 文件内注册路由器 => 在页面内使用路由组件标签
3. 配置路由：
   ```javascript
     {
         path: '/路由名',
         component: 路由名
     }
   ```
4. 注册路由器：
   ```javascript
     import router from './router'
     new Vue({
      router
     })
   ```
4. 组件标签：
   1. router-link: 用来生成路由链接 (可不写)，<router-link to="/xxx">Go to XXX</router-link>
   2. router-view: 用来显示当前路由组件界面 (必须写)，<router-view></router-view>
5. 嵌套路由：
   ```javascript
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
   ```
## Vuex
1. 概念：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
        简单的说，vuex 就是对 vue 应用中多个组件的共享状态进行集中式的管理 (读/写)。
2. 核心 API
   1. state：相当于 data
   2. getters：包含 n 个基于 state 数据 getter 计算属性的方法的对象
   3. mutations：包含 n 个用于直接更新状态数据的方法的对象
   4. actions：包含 n 个用于间接更新状态数据的方法的对象
   5. modules：将 store 对象分割为多个 module，每个 module 都包含自己的 state、mutations、actions、getters，防止 store 对象过于臃肿
3. 区分 actions(dispatch) 和 mutations(commit) 的使用
   1. actions(dispatch)：除改变数据外还有其他操作 (如逻辑判断的等) 以及异步代码
   2. mutations(commit)：仅改变数据
4. 使用
   1. 配置 store。store 是组件与 vuex 通信的一个桥梁对象
   ```javascript
    export default new Vue.Store(){
      state,
     mutations,
     actions,
     getters,
    }
   ```
   2. 在入口文件中引入并配置 store。配置后所有组件都可以通过$store 来访问 store 对象
   3. 分别配置 state、actions、mutations、getters
   4. 在 vue 文件内编写页面以及操作逻辑。当直接操作数据时调用 commit()，当间接操作数据时调用 dispatch()
    
-------------------------------- 分隔 --------------------------------

使用 await 和 async 报错：
    A.原因：ES6 新语法包括两个方面，一是新语法 (如 const、let)，二是新 API(如 Map、Promise)，而@babel/preset-env 只能编译新语法，不能处理新 API，故报错
    B.解决方法：使用@babel/polyfill 来提供新 API 的实现
    C.原理：@babel/polyfill 内有两个包，分别是 core-js 和 regenerator-runtime，core-js：提供 ES5/ES6/ES7 的新 API 实现；regenerator-runtime：提供 ES8 的 await 和 async