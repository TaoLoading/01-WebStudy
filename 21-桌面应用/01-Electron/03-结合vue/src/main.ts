/**
 * 渲染进程
 */

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './samples/node-api'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
