## require.js使用教程
1. 下载require.js
  * 官网: http://www.requirejs.cn/
  * github : https://github.com/requirejs/requirejs
  * 将require.js导入项目: js/libs/require.js 
2. 创建项目结构
  ```
  |-js
    |-libs
      |-require.js
    |-modules
      |-loger.js
      |-dataService.js
    |-main.js
  |-index.html
  ```
3. 定义require.js的模块代码
  * dataService.js
    ```
    define(function () {
      let msg = 'atguigu.com'
    
      function getMsg() {
        return msg.toUpperCase()
      }
    
      return {getMsg}
    })
    ```
  * loger.js
    ```
    define(['dataService', 'jquery'], function (dataService, $) {
      let name = 'Tom2'
    
      function showMsg() {
        $('body').css('background', 'gray')
        console.log(dataService.getMsg() + ', ' + name)
      }
    
      return {showMsg}
    })
    ```
4. 应用主(入口)js: main.js
  ```
    requirejs.config({
      //模块标识名与模块路径映射
      paths: {
        "loger": "modules/loger",
        "dataService": "modules/dataService",
      }
    })
  
    //引入使用模块
    requirejs( ['loger'], function(loger) {
      loger.showMsg()
    })
    
  ```
        
5. 页面使用模块:

  ```<script data-main="js/main.js" src="js/libs/require.js"></script>```
    

6. 使用第三方基于require.js的框架(jquery)
  * 将jquery的库文件导入到项目: 
    * js/libs/jquery-1.10.1.js
  * 在main.js中配置jquery路径
    ```
    paths: {
              'jquery': 'libs/jquery-1.10.1'
          }
    ```
  * 在loger.js中使用jquery
    ```
    define(['dataService','jquery'],function (dataService,$) {
      function showMsg() {
        console.log(dataService.getData());
        $('body').css('background','skyblue')
      }
      return {showMsg}
    })
    ```
  * 备注：define中的要写jquery不可以写jQuery，因为jQuery源码已经对AMD模块化进行了适配，已经定义好了"jquery"