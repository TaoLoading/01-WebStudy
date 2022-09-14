# Vite

## 基础知识
1. 搭建基础架构
   1. 搭建基础架构
      1. `npm init vite@latest`
   2. 开发Vue3：
      1. 在初始化文件时直接选择vue，即vue3
   3. 使用JSX：
      1. 安装`@vitejs/plugin-vue-jsx`插件
   4. 开发Vue2：
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
      1. 完善src文件夹
   5. 开发React：
      1. 在初始化文件时直接选择react
2. 处理CSS
   1. 原生css variable
   2. PostCSS
   3. @import alias路径配置
   4. CSS Modules
   5. CSS pre-processors预处理器（.scss, .sass, .less, .styl 和 .stylus）
      1. 以scss为例，在使用前安装scss预处理器依赖`npm install -D scss`
3. 处理TypeScript
   1. Vite天然支持引入.ts文件，但Vite只对ts文件进行编译，不进行校验
   2. 可以运行`tsc --noEmit`或者安装`vue-tsc`然后运行`vue-tsc --noEmit`对ts文件进行类型检查
   3. isolatedModules
      1. esbuild只执行没有类型信息的转译，并不支持某些特性，设置`"isolatedModules": true`可以对相关内容进行提醒，如接口多级暴露报错、未使用模块化报错等
4. 处理静态资源文件
5. ESLint语法检查
   1. 安装相关插件`eslint-config-standard eslint-plugin-import eslint-plugin-promise eslint-plugin-node`
   2. 配置语法规则文件.eslintrc.js
6. Prettier代码格式化
   1. 安装Prettier插件
   2. 配置格式化代码规则文件.prettierrc
7. 自定义环境变量
   1. 配置.env文件并在内部声明环境变量，注意命名时要以'VITE_'开头
   2. 开发环境下使用`import.meta.env.VITE_XXX`进行使用
   3. 注意生产环境下不能使用`import.meta.env`拿到数据，开发环境下通过打包会将需要使用`import.meta.env`的数据自动转换成相关的值，如生产环境下`import.meta.env`通过打包拿到的是一个对象，`import.meta.env.xxx`拿到的是这个对象的值
   4. 当.env配置不同的后缀如development和production时，里面的值只有在对应环境下才能拿到

## 高级应用
1. HMR API
   1. 热更新，在搭建项目架构时选择响应框架，可通过其安装的插件实现热更新
   2. 手动实现热更新
       ```
       if (import.meta.hot) {
         // 接收模块自身
         import.meta.hot.accept((newModule) => {
           // newModule为暴露出来的模块，即之前定义的render()
           console.log(newModule)
           newModule.render()
         })
       }
       ```
2. glob import
3. 预编译
   1. 第一次运行项目前，vite将对所使用的包会进行一次预编译，同时将编译后的文件放在cache中，之后启动项目时直接在cache中读取，提升速度
   2. CommonJS to ESM。预编译时vite通过CommonJS to ESM将非ESM语法的包转换为ESM语法规范
   3. bundle files together。将零碎的包文件打包到一起。如对于lodash这种包含多个文件的包，使用一个lodash会导致多个引用，影响性能，通过将其打包到一个文件解决此问题