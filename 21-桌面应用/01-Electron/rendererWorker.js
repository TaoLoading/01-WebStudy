/**
 * worker 窗口渲染进程
 */

const doWork = (input) => {
  return input * 2
}

window.channel.workerReceive((event) => {
  const [port] = event.ports
  port.onmessage = (event) => {
    const result = doWork(event.data)
    port.postMessage(result)
  }
})