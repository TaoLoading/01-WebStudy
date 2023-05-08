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
})