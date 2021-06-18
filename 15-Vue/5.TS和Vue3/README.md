# TypeScript记录
## 安装
1. 全局安装ts：` npm install -g typescript `
2. 检查是否安装成功：` tsc -V  `
## 编译
1. 手动编译：` tsc xxx.ts `
2. 在vscode中自动编译
  + 生成配置文件tsconfig.json：` tsc --init `
  + 修改tsconfig.json配置：` "outDir": "./js", `，` "strict": false, `
  + 启动监视任务：` 终端 -> 运行任务 -> 监视tsconfig.json `
## 基础知识
1. 类型注解
2. 接口(interface)
3. 类
4. wenpack打包ts
  + 下载依赖：` typescript、webpack、webpack-cli、webpack-dev-server、html-webpack-plugin、clean-webpack-plugin、ts-loader、cross-env（跨平台） `
  + 配置入口文件
  + 书写页面
  + 配置webpack
  + 配置打包命令
  + 开始打包
5. 基本数据类型
  + 布尔值
  + 数字
  + 字符串
  + undefined和null
  + 数组
  + 元组(Tuple)
  + 枚举(enum)
  + any
  + void(与any相反，表示没有任何类型)
  + object