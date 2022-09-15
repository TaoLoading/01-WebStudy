# 脚手架文件

## 创建项目
``` create-react-app 项目名 ```

## 特殊文件用途
1. reportWebVitals.js：用于检测程序性能
2. setupTests.js：用于测试程序
3. setupProxy.js：用于配置代理

## 配置代理
1. 方法一：在package.json中增加proxy配置
   ```
      {
        ......
        "browserslist": {
          ...
        },
        <!-- 配置代理到目标地址 -->
        "proxy": "http://localhost:5000"
      }
    ```
2. 方法二：配置代理文件
    ```
      const proxy = require('http-proxy-middleware')

      module.exports = function (app) {
        app.use(
          proxy('/api', {
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: { '^api1/': {} }
          })
        )
      }
    ```