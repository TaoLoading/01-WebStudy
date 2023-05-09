/**
 * worker 窗口预加载脚本
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('channel', {
  // 接收主窗口传来的数据
  workerReceive: (callback) => ipcRenderer.on('new-client', callback)
})