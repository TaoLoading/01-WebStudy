import './style.css'

export function render() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <h1>Hello Vite!</h1>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  `  
}
render()

// 手动实现HMR
if (import.meta.hot) {
  // 接收模块自身
  import.meta.hot.accept((newModule) => {
    // newModule为暴露出来的模块，即上方的render()
    console.log(newModule)
    newModule.render()
  })
}