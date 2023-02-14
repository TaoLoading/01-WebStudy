## 视频系统

### 项目架构
```md
|-- videoSystem
    |-- app.js // 入口文件
    |-- directoryList.md
    |-- package.json
    |-- README.md
    |-- yarn.lock
    |-- config // 配置信息
    |   |-- config.default.js
    |-- controller // 接口的逻辑处理
    |   |-- index.js
    |   |-- userController.js
    |   |-- videoController.js
    |-- middleware // 中间件的使用
    |   |-- validator // 负责校验的中间件
    |       |-- errorBack.js // 错误返回
    |       |-- userValidator.js // 校验规则
    |-- model // 数据库模型
    |   |-- index.js
    |   |-- userModel.js
    |-- router // 路由配置
        |-- index.js
        |-- user.js
        |-- video.js
```

### 用到的部分插件
1. express-validator：express的中间件，验证输入信息