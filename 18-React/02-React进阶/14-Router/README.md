# React Router

**以下内容基于React Router6版本**

## 基础API
1. BrowserRouter或HashRouter
   * Router中包含了对路径改变的监听，并且会将相应的路径传递给子组件
   * BrowserRouter使用history模式
   * HashRouter使用hash模式
2. Link和NavLink
   * 通常路径的跳转是使用Link组件，最终会被渲染成a元素
   * NavLink是在Link基础之上增加了一些样式属性
     * ~~activeStyle：活跃时（匹配时）的样式~~**6版本中已删除**
     * ~~activeClassName：活跃时添加的class~~**6版本中已删除**
     * ~~在默认匹配成功时，NavLink就会添加上一个动态的active class~~**6版本中已删除**
     * 6版本中设置NavLink样式的方式为在className中设置函数，通过判断isActive的值来增加相关类型
   ```javascript
   <NavLink className={({ isActive }) => { return isActive ? '类名' : '' }} to="/about">About</NavLink>
   ```
3. Route
   * Route用于路径的匹配
   * path属性：用于设置匹配到的路径
   * component属性：设置匹配到路径后，渲染的组件
   * exact：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件
   * caseSensitive：用于规定匹配时是否区分大小写
   ```javascript
   <Route path="/about" element={<About />} />
   ```
4. Navigate
   * ~~Redirect用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中~~ **6版本中已删除Redirect，改为Navigate**
   * Navigate用于路由的重定向，当这个组件出现时，就会执行跳转到对应的to路径中
   ```javascript
   <Route path="/" element={<Navigate to="/about" />}></Route>
   ```

## 路由文件的使用
1. 定义路由文件。与vue-router类似，区别如下：
   * element属性用来展示组件
   * 在使用嵌套路由时，子路由的path最前面不加'/'
2. 使用路由。在App.js文件内使用如下，其中routes为路由文件
   * 声明路由
      ```javascript
      const element = useRoutes(routes)
      ```
   * 注册路由
      ```javascript
      {element}
      ```
3. 嵌套路由
   * 在父组件内用``` <Outlet /> ```来指定路由展示位置
   * 嵌套路由在路由跳转时可简写to的值，即路由不需要写完整的路由，简写时自动将该路由拼接到当前路由下
     ```javascript
     <NavLink className="list-group-item" to="news">News</NavLink>
     ```

## 路由传参（见 Detail 页面）
1. params参数
   * 路由跳转
   ```javascript
   <Link to={`detail/${item.id}/${item.title}/${item.content}`}>{item.content}</Link>
   ```
   * 路由配置
   ```javascript
   ......
   {
     path: 'message',
     element: <Message />,
     children: [
       {
         path: 'detail/:id/:title/:content',
         element: <Detail />
       }
     ]
   }
   ```
   * 接收参数。使用useParams()
   ```javascript
   const { id, title, content } = useParams()
   ```
2. search参数
   * 路由跳转
   ```javascript
   <Link to={`detail?id=${item.id}&title=${item.title}&content=${item.content}`}>{item.content}</Link>
   ```
   * 路由配置
   ```javascript
   ......
   {
    path: 'message',
    element: <Message />,
    children: [
      {
        path: 'detail',
        element: <Detail />
      }
    ]
   }
   ```
   * 接收参数。使用useSearchParams()
   ```javascript
   const [search] = useSearchParams()
   const id = search.get('id')
   const title = search.get('title')
   const content = search.get('content')
   ```
3. state参数
   * 路由跳转
   ```javascript
   <Link to="detail" state={{
    id: item.id,
    title: item.title,
    content: item.content
   }}>
    {item.content}
   </Link>
   ```
   * 路由配置
   ```javascript
   ......
   {
    path: 'message',
    element: <Message />,
    children: [
      {
        path: 'detail',
        element: <Detail />
      }
    ]
   }
   ```
   * 接收参数。使用useLocation()
   ```javascript
   const { state: { id, title, content } } = useLocation()
   ```
   
## 编程式路由导航
通过useNavigate()来实现，如下。navigate()中还可直接传入数字实现前进后退
```javascript
const navigate = useNavigate()
function jumpDetail(item) {
 navigate('detail', {
   replace: false,
   state: {
     id: item.id,
     title: item.title,
     content: item.content
   }
 })
}

......

<li key={item.id}>
 <button onClick={() => jumpDetail(item)}>跳转到详情{item.id}</button>
</li>
```