/**
 * 渲染进程
 */

const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', () => {
  window.communication.renderSendMsg1()
})

const btn2 = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')
btn2.addEventListener('click', async () => {
  const filePath = await window.communication.renderSendMsg2()
  filePathElement.innerText = filePath
})