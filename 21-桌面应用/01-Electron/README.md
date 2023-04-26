# Electron

## 创建一个简单的程序

1. 初始化仓库：`pnpm init`

2. 安装 Electron（由于网络原因此处使用 cnpm）：`cnpm i electron -S`

3. 创建入口文件 main.js

   ```js
   const { app, BrowserWindow } = require('electron')
   
   const createWindow = () => {
     const win = new BrowserWindow({
       width: 800,
       height: 600
     })
   
     // 加载 html 页面
     // win.loadURL('https://github.com/TaoLoading')
     win.loadFile('index.html')
   
     // 打开 devtools
     // win.webContents.openDevTools()
   }
   
   // 当 Electron 完成初始化后，加载应用
   app.whenReady().then(() => {
     createWindow()
   })
   ```

   

4. 创建 html 页面

   ```html
   <!DOCTYPE html>
   <html>
   
   <head>
     <meta charset="UTF-8">
     <!-- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP -->
     <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
     <title>你好!</title>
   </head>
   
   <body>
     <h1>你好！</h1>
     我们正在使用 Node.js <span id="node-version"></span>,
     Chromium <span id="chrome-version"></span>,
     和 Electron <span id="electron-version"></span>.
   </body>
   
   </html>
   ```

   

5. 修改启动命令：`"dev": "nodemon --exec electron ."`

6. 执行启动命令

## 管理窗口生命周期

应用窗口在不同操作系统中的行为也不同，Electron 支持对应用窗口自定义：

1. 在 Windows 和 Linux 中，我们通常希望在关闭一个应用的所有窗口后让它退出

   ```js
   app.whenReady().then(() => {
     createWindow()
   
     // 如果没有窗口打开则打开一个窗口 (macOS)
     app.on('activate', () => {
       if (BrowserWindow.getAllWindows().length === 0) createWindow()
     })
   })
   ```

   

2. 在 macOS 中，关闭窗口后程序依然运行，此时在没有窗口可用时调用 app 会打开一个新窗口

   ```js
   // 关闭所有窗口时退出应用 (Windows & Linux)
   app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') app.quit()
   })
   ```

## 多进程

###  为什么是多进程而不是单进程？

浏览器功能复杂，在早期是通过单进程来处理功能的，这样的缺点就是某一个标签页发生错误可能会导致整个浏览器的崩溃

### 主进程（Main Process）

1. 概念：主进程由 Electron 应用程序启动的进程，用于管理应用程序的生命周期、操作系统窗口和原生操作系统功能
2. 特点：
   1. 每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点
   2. 主进程可以通过创建一个或多个渲染进程来负责显示和处理应用程序的用户界面
   3. 主进程在 Node.js 环境中运行，这意味着它具有 require 模块和使用所有 Node.js API 的能力
3. 窗口管理：主进程的主要目的是使用 BrowserWindow 模块来创建和管理应用程序窗口
4. 生命周期：主进程可以通过 app 模块来控制应用程序的生命周期

### 渲染进程（Renderer Process）

1. 概念：渲染进程由主进程创建的进程，用于显示和处理应用程序的用户界面
2. 特点：
   1. 从 Electron 20 开始，每个渲染进程都运行在自己的沙箱环境中，不再拥有完整 Node.js 环境的访问权，以防止恶意代码或不良行为对应用程序或用户的安全造成威胁
   2. 通常情况下，一个 Electron 应用程序的每个窗口都有一个独立的渲染进程

### 预加载脚本（preload script）

1. 概念：预加载脚本是一种可以在渲染进程中执行的 JavaScript 脚本，它可以为渲染进程提供额外的功能和服务

2. 作用：
   1. 提供额外的功能：预加载脚本可以在渲染进程中注入额外的功能，例如在 window 对象中添加自定义方法、类或者属性
   2. 修改默认行为：预加载脚本可以修改 Electron 默认的行为，例如修改 ipcRenderer 对象的默认行为，或者修改 BrowserWindow 的默认菜单栏
   3. 保持安全性：预加载脚本可以在渲染进程和主进程之间充当一个安全层，它可以拦截和处理渲染进程发送的消息，从而保护主进程的安全性

3. 使用方法
   1. 创建一个预加载文件 `preload.js` 并定义操作
   
   2. 在 BrowserWindow 构造函数中的 webPreferences 中进行加入
   
      ```js	
      const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js')
        }
      })
      ```
   
      