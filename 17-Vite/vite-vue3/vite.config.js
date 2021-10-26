import { defineConfig } from 'vite'
// 开发Vue3的辅助插件
import vue from '@vitejs/plugin-vue'
// 使用JSX开发的辅助插件
import vueJxs from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJxs()]
})
