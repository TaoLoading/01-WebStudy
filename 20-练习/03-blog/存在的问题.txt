1.
位置：app.js中拦截请求并根据登录状态进行操作
问题：视频代码为 if(req.url != 'login && !req.session.username)，报的错误是TypeError: Cannot read property 'username' of undefined

2.
位置：app.js中拦截请求并根据登录状态进行操作
问题：使用res.redirect('/admin/login)重定向后只有html代码生效，css、js及引入的bootstrap、jQuery均失效

3.
位置：user.art文字中的对分页按钮的代码，<li style="display: <%= page-1<1?'none':'inline' %>">
问题：VS Code报错property value expected

4.
位置：所有用的populate()进行多集合联合查询和res.render()传递第二个参数的代码
问题：同时使用populate()进行多集合联合查询和res.render()传递第二个参数时，报错SyntaxError: Unexpected token R in JSON at position 0



需要学习：
1.art-template模板引擎
    (1)外链资源改成绝对路径，因为模板中外链资源相对路径是相对于地址栏的当前路径，一旦发生改变则外链资源链接不到，故需要改成绝对路径
    (2)在使用模板引擎时，类似{{@xxx}}这种引入内容时，尖括号和@空一格就会报错：SyntaxError: Unexpected token T in JSON at position 0
2.两种分页处理方式
3.为什么要使用异步函数


待完善：
1.两次登录拦截：未登录或者普通用户登录不能跳转到管理页面