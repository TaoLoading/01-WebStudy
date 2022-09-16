# react-router

## 1. 基础API
* BrowserRouter或HashRouter
  * Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件
  * BrowserRouter使用history模式
  * HashRouter使用hash模式
* Link和NavLink
  * 通常路径的跳转是使用Link组件，最终会被渲染成a元素
  * NavLink是在Link基础之上增加了一些样式属性
    * ~~activeStyle：活跃时（匹配时）的样式~~**6版本中已删除**
    * ~~activeClassName：活跃时添加的class~~**6版本中已删除**
    * ~~在默认匹配成功时，NavLink就会添加上一个动态的active class~~**6版本中已删除**
    * 6版本中设置NavLink样式的方式为在className中设置函数，通过判断isActive的值来增加相关类型
    ``` <NavLink className={({ isActive }) => { return isActive ? '类名' : '' }} to="/about">About</NavLink> ```
* Route
  * Route用于路径的匹配
  * path属性：用于设置匹配到的路径
  * component属性：设置匹配到路径后，渲染的组件
  * exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件
  * caseSensitive：用于规定匹配时是否区分大小写
    ``` <Route path="/about" element={<About />} /> ```
* Navigate
  * ~~Redirect用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中~~ **6版本中已删除Redirect，改为Navigate**
  * Navigate用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中
    ``` <Route path="/" element={<Navigate to="/about" />}></Route> ```

## 2. 嵌套路由
* 见“关于”页面

## 3. 手动跳转路由
* 目前我们实现的跳转主要是通过Link或者NavLink进行跳转的，实际上我们也可以通过JavaScript代码进行跳转
* 通过JavaScript代码进行跳转有一个前提：必须获取到history对象。获取到history的两种方式
   1. 如果该组件是通过路由直接跳转过来的，那么可以直接获取history、location、match对象
    ```
      this.props.history.push("/about/join")
    ```
   2. 如果该组件是一个普通渲染的组件，那么不可以直接获取history、location、match对象。使用withRouter高阶组件获取
      1. 在index.js文件中将App组件包裹在BrowserRouter标签中
      2. 在组件内使用withRouter进行处理
        ```
          export default withRouter(App)
        ```

## 4. 路由传参
* 见“详情”页面
1. 动态路由
  ```
    <NavLink to={`/detail/${id}`} activeClassName="link-active">详情</NavLink
  ```
2. 传递字符串
  ```
    <NavLink to={`/detail2?name=why&age=18`} activeClassName="link-active">详情2(字符串)</NavLink>
  ```
3. 传递对象state
  ```
    <NavLink to={{ pathname: "/detail3", search: "name=abc", state: info }} activeClassName="link-active">详情3(对象)</NavLink>
  ```

## 5. 剥离路由文件
* 见router文件夹下“index.js”文件
1. 定义路由文件
2. 引入路由文件，并从react-router-config中引入renderRoutes
3. 使用路由文件
  ```
    {renderRoutes(routes)}
  ```