/**
 * 渲染进程
 */

const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async () => {
  // 测试从渲染进程向主进程通信
  const res1 = await window.versions.renderingMsg()
  console.log(res1)

  /* const res2 = await window.versions.mainMsg()
  console.log(res2) */
}
func()