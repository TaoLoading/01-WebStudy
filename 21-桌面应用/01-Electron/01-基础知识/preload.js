/**
 * 预加载脚本
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  // 获取版本信息
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

contextBridge.exposeInMainWorld('communication', {
  // 渲染进程向主进程通信（单向）
  renderSendMsg1: () => ipcRenderer.send('renderToMain1', 'render To Main'),
  // 渲染进程向主进程通信（双向）
  renderSendMsg2: () => ipcRenderer.invoke('renderToMain2'),
  // 主进程向渲染进程通信
  mainSendMsg: (callback) => ipcRenderer.on('update-counter', callback),
  // 渲染进程向渲染进程通信
  // 主窗口向 worker 窗口发送消息
  renderSend: () => ipcRenderer.send('request-worker-channel'),
  // 主窗口接收 worker 窗口返回的消息
  renderReceive: (callback) => ipcRenderer.once('provide-worker-channel', callback),
})