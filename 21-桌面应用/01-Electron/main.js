/**
 * 主进程
 */

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 接收渲染进程发来的消息
  ipcMain.handle('renderingMsg', () => '我是渲染进程发送的消息')

  // 向渲染进程发送消息
  ipcMain.on('mainMsg', () => {

  })

  // 加载 html 页面
  // win.loadURL('https://github.com/TaoLoading')
  win.loadFile('index.html')

  // 打开 devtools
  win.webContents.openDevTools()
}

// 当 Electron 完成初始化后，加载应用
app.whenReady().then(() => {
  createWindow()

  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  console.log('closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})