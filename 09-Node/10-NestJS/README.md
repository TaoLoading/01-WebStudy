# NestJS

## 初始化

```
安装脚手架：
$ npm i -g @nestjs/cli

创建项目：
$ nest new project-name

运行：
pnpm start
pnpm start:dev
```

## 核心文件

```js
src
├── app.controller.spec.ts // 针对控制器的单元测试
├── app.controller.ts // 单个路由的基本控制器(Controller)
├── app.module.ts // 应用程序的根模块(Module)
├── app.service.ts // 具有单一方法的基本服务(Service)
├── main.ts // 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例
```

## @Module()装饰器

@Module装饰器接收四个属性：

1. providers：Nest.js注入器实例化的服务提供者，即数据来源的逻辑处理
2. controllers：处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
3. imports：导入模块
4. exports：导出模块

## 创建基础指令

```
// 创建完整功能模块：
// 1. 生成module
nest g mo [name]
// 2. 生成controller
nest g co [name]
// 3. 生成service
nest g s [name]

// 创建基础CRUD模块：
nest g res user
```

## Swagger的使用

1. 安装包

   ```js
   pnpm i @nestjs/swagger
   ```

2. 配置main.ts

   ```js
   import { NestFactory } from '@nestjs/core'
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
   import { AppModule } from './app.module'
   
   async function bootstrap() {
     const app = await NestFactory.create(AppModule)
   
     const config = new DocumentBuilder()
       .setTitle('Swagger example')
       .setDescription('The example API description')
       .setVersion('1.0')
       .addTag('example')
       .build()
     const document = SwaggerModule.createDocument(app, config)
     SwaggerModule.setup('doc', app, document)
   
     await app.listen(3000, () => {
       console.log('服务器运行成功，点击打开 http://localhost:3000')
     })
   }
   bootstrap()
   ```

3. 配置接口说明（controller文件中）

   ```js
   @ApiTags('用户相关') // 模块说明
   
   @ApiOperation({ summary: '添加用户' }) // 接口说明
   ```

   
