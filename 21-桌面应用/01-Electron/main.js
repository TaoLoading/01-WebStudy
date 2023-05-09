/**
 * 主进程
 */

const { app, BrowserWindow, ipcMain, dialog, Menu, MessageChannelMain } = require('electron')
const path = require('path')

const createWindow = async () => {
  // 主页面
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // worker 页面
  const worker = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preloadWorker.js')
    }
  })

  // 加载页面
  await worker.loadFile('worker.html')
  // await win.loadURL('https://github.com/TaoLoading')
  await win.loadFile('index.html')

  // 打开 devtools
  win.webContents.openDevTools()
  worker.webContents.openDevTools()

  /* 进程通信相关 start */

  // ipcMain.on 用于监听渲染进程发来的事件
  ipcMain.on('renderToMain1', (event, msg) => {
    console.log('msg', msg)
  })

  // ipcMain.handle 用于向渲染进程提供一种类似于方法调用的形式来处理请求
  // 当渲染进程向主进程发出请求时，可以使用 ipcMain.handle 注册一个处理函数，主进程会调用该函数来处理请求，并将结果返回给渲染进程
  ipcMain.handle('renderToMain2', handleFileOpen)

  // 创建菜单，用于测试主进程向渲染进程通信
  const menu = Menu.buildFromTemplate([
    {
      label: '加减数值',
      submenu: [
        {
          // 向渲染进程发送消息
          click: () => win.webContents.send('update-counter', 1),
          label: '+'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: '-'
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.webContents.mainFrame.on('request-worker-channel', (event) => {
    console.log('request-worker-channel')
    // 创建通道
    const { port1, port2 } = new MessageChannelMain()
    worker.webContents.postMessage('new-client', null, [port1])
    event.senderFrame.postMessage('provide-worker-channel', null, [port2])
  })
  /* 进程通信相关 end */
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
    return '未选择文件'
  } else {
    return filePaths[0]
  }
}