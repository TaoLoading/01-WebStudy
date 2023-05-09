/**
 * 渲染进程
 */

// 版本相关
const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

// 渲染器进程到主进程通信（单向）相关
const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
  window.communication.renderSendMsg1()
})

// 演示渲染器进程到主进程通信（双向）相关
const btn2 = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')
btn2.addEventListener('click', async () => {
  const filePath = await window.communication.renderSendMsg2()
  filePathElement.innerText = filePath
})

// 主进程到渲染进程通信相关
const counter = document.getElementById('counter')
window.communication.mainSendMsg((event, value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue
})

// 渲染进程到渲染进程通信相关
const btn3 = document.getElementById('btn3')
btn3.addEventListener('click', () => {
  window.communication.renderSend()
})
window.communication.renderReceive((event) => {
  console.log('provide-worker-channel')
  const [port] = event.ports
  port.onmessage = (event) => {
    console.log('received result:', event.data)
  }
  port.postMessage(21)
})