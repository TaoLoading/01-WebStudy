/**
 * 主进程
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 html 页面
  // win.loadURL('https://github.com/TaoLoading')
  win.loadFile('index.html')

  // 打开 devtools
  win.webContents.openDevTools()

  // ipcMain.on 用于监听渲染进程发来的事件
  ipcMain.on('renderToMain1', (event, msg) => {
    console.log('msg', msg)
  })

  // ipcMain.handle 用于向渲染进程提供一种类似于方法调用的形式来处理请求
  // 当渲染进程向主进程发出请求时，可以使用 ipcMain.handle 注册一个处理函数，主进程会调用该函数来处理请求，并将结果返回给渲染进程
  ipcMain.handle('renderToMain2', handleFileOpen)
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

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {

  } else {
    return filePaths[0]
  }
}