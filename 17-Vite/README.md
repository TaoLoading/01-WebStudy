# Vite

## 基础知识
1. 开发Vue3：
   1. 在初始化文件时直接选择vue，即vue3
2. 使用JSX：
   1. 安装`@vitejs/plugin-vue-jsx`插件
3. 开发Vue2：
   1. Vite初始化文件时并未提供Vue2选项
   2. 初始化文件时选择vanilla
   3. 安装`underfin/vite-plugin-vue2`插件
   4. 配置vite.config.js文件
    ```
   import { createVuePlugin } from 'vite-plugin-vue2'

   export default {
     plugins: [
       createVuePlugin(/* options */)
     ],
   }
    ```
   5. 完善src文件夹
4. 