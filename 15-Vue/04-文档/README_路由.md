## 1. vue-router
    是用来实现SPA的vue插件
    
## 2. vue-router的基本使用
    1). 创建路由器: router/index.js
        new VueRouter({
          mode: 'hash/history'
          routes: [
            { // 一般路由
              path: '/about',
              component: About
            },
            { // 自动跳转路由
              path: '/',
              redirect: '/about'
            }
          ]
        })
    2). 注册路由器: main.js
        import router from './router'
        new Vue({
          router
        })
    3). 使用路由组件标签:
        <router-link to="/xxx">Go to XXX</router-link>  // 可以不使用
        <router-view></router-view>  // 必须使用
    4). 2个对象
        $router: 代表路由器对象, 包含一些实现路由跳转/导航的方法: push()/replace()/back()
        $route: 代表当前路由对象, 包含一些路由相关的属性: path/params/query/meta

## 3. 编写路由的3步
    1). 定义路由组件
    2). 映射路由
    3). 使用<router-view/>显示当前路由组件

## 4. 嵌套路由
    children: [
        {
          path: '/home/news/:id/:title',
          component: news
        },
        {
          path: 'message',
          component: message
        }
    ]

## 4. 向路由组件传递数据
    params/query: <router-link to="/home/news/123/abc?zzz=1234">
    将请求参数映射成props: props=true | props: route => ({id: route.params.id})
    变相props: <router-view msg='abc'>

## 5. 动态路由与路由别名
    注册路由: 
        {
            name: 'news'
            path: '/home/news/:id/:title',
            component: News
        }
    跳转: 
        <router-link to="{name: 'news', params: {id: 1, title: 'abc'}}">
        router.push({name: 'news', params: {id: 1, title: 'abc'}})

## 6. 缓存路由组件
    路由组件对象默认的生命周期: 被切换时就会死亡, 切换回来时重新创建
    <keep-alive exlude="A,B">
      <router-view></router-view>
    </keep-alive>

## 7. 路由的编程式导航
    this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
    this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
    this.$router.back(): 请求(返回)上一个记录路由

## 8. 路由的2种模式比较, 解决history模式404问题
    hash模式:
        路径中带#: http://localhost:8080/#/home/news
        发请求的路径: http://localhost:8080  项目根路径
        响应: 返回的总是index页面  ==> path部分(/home/news)被解析为前台路由路径

    history模式:
        路径中不带#: http://localhost:8080/home/news
        发请求的路径: http://localhost:8080/home/news
        响应: 404错误
        希望: 如果没有对应的资源, 返回index页面, path部分(/home/news)被解析为前台路由路径
        解决: 添加配置
            devServer: historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
            output: publicPath: '/', // 引入打包的文件时路径以/开头

