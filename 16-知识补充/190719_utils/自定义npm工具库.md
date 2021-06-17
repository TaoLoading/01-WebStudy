# 打包自定义工具库
## 1. 编码与配置
### 1). 入口JS
    export { apply } from './function/apply'
    export { default as axios } from './axios'
		
### 2). webpack配置
    const path = require('path')

    module.exports = {
      // mode: 'development',
      mode: 'production',
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'atguigu-utils.js',
        filename: 'atguigu-utils.min.js',
        libraryTarget: 'umd',
        library: 'aUtils'
      },
      externals: {
        lodash: {
          commonjs: 'lodash',
          commonjs2: 'lodash',
          amd: 'lodash',
          root: '_' // 指向全局变量
        }
      }
    }

### 3). package.json
    {
      "name": "atguigu-utils",
      "version": "1.1.7",
      "author": "xfzhang",
      "description": "尚硅谷大前端自定义工具函数库",
      "keywords": ["atguigu", "utils", "array", "object", "function", "promise", "axios"],
      "main": "dist/atguigu-utils.js",
      "license": "MIT",
      "scripts": {
        "build": "webpack"
      },
      "devDependencies": {
        "webpack": "^4.41.5",
        "webpack-cli": "^3.3.10"
      },
      "dependencies": {
        "lodash": "^4.17.15"
      }
    }

### 4). 生成打包库文件
    npm run build

## 2. 发布到npm仓库
		1). 前置
        npm配置的中央仓库不能是淘宝镜像
        npm config set registry https://registry.npmjs.org/
        npm config set registry http://registry.npm.taobao.org/
          
    2). 注册npm中央仓库账号
        https://www.npmjs.com/
        用户名/密码/邮箱(必须验证, 不要用QQ邮箱)
		
    3). npm addUser
        登陆npm仓库
        依次指定用户名/密码/邮箱
		
    4). npm publish
			  将库发布到npm仓库
			  要求: 库的名称一定要唯一
		
    5). npm unpublish --force
        强制删除已发布的库
        注意: 必须在72小时内, 否则不能再删除

## 3. 下载并使用自定义工具包
    1). 下载并使用自定义工具包
	      yarn add atguigu-utils
	 
    2). 网页中使用
		    <script src="./node_modules/atguigu-utils/dist/atguigu-utils.js"></script>
        <script>
          console.log(aUtils.flatten1([1, [3, [2, 4]]]))  // [1, 3, 2, 4]
        </script>
	  
    3). 模块引入并使用
        import {flatten1} from 'atguigu-utils'
        const {flatten2} = require('atguigu-utils')
        console.log(aUtils.flatten1([1, [3, [2, 4]]]))
        console.log(aUtils.flatten2([1, [3, [2, 4]]]))