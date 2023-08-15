# Webpack

## webpack.config.js

常用配置项：

1. mode：指定开发/生成模式
2. entry：指定入口文件
3. output：指定输出路径
4. module：配置模块的加载和转换规则
5. plugins：配置插件。用于扩展 webpack 功能
6. devServer：开发服务器
7. resolve：配置模块解析的规则，包括设置模块的搜索路径、配置别名等
8. optimization：配置优化相关的选项，包括代码分割、压缩等
9. devtool：配置源代码映射方式

## loader

### 作用

用于打包非 JavaScript 文件。放在 module 中配置

### 使用

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            // 图片名称
            name: '[name].[contenthash].[ext]',
            // 图片打包的路径
            outputPath: 'images'
          }
        }
      ]
    }
  ]
}
```

### 示例：打包样式

除 css 外还可处理 sass、postcss 等。当使用多个 loader 时，loader 的执行顺序为从右到左

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

## plugins

### 作用

用于扩展 webpack 功能，主要包括：

1. 打包优化：插件可以对打包结果进行优化，如压缩代码、去除注释、提取公共模块等，以改善性能和加载速度
2. 资源管理：插件可以帮助管理项目中的静态资源，如复制文件、生成 HTML 文件、处理图像等
3. 环境变量注入：插件可以向构建过程中注入环境变量或全局变量，以便在代码中使用
4. 执行自定义任务：插件可以执行任意自定义任务，如执行特定的脚本、生成报告等

### 使用

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
      filename: 'index.html'
    })
  ]
}
```

## SourceMap

### 作用

SourceMap 是一个映射文件，提供了一种映射关系，用于将打包后的代码行与源代码行进行对应，从而使开发者能够在浏览器中准确地定位源代码 

### 使用

```js
module.exports = {
  devtool: 'source-map'
}
```

不止 source-map 这一个值，还有多个比如 cheap-module-eval-source-map 等，适当使用可提升打包速度。推荐使用：

1. 开发环境：cheap-module-eval-source-map
2. 生成环境：cheap-module-source-map

## Bable

### 作用

Babel 是一个广泛使用的 JavaScript 编译器，它的主要作用是将新版本的 JavaScript 代码转换为向后兼容的旧版本代码，以便在不支持最新语法和功能的浏览器或环境中运行

### 使用

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'] // 使用 preset-env 转换代码，可能会导致转换不全
            presets: [
              [
                '@babel/preset-env',
                {
                  'useBuiltIns': 'usage' // 使用 polyfill 并按业务代码去引入 polyfills。注意此时应该已在入口文件引入 polyfills
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```

### @babel/preset-env 和@babel/polyfill 的区别

1. @babel/preset-env 只转换语法，并不处理新的 API
2. @babel/polyfill 是一个用于转换新的 API，如 Promise、Array.from、Object.assign 等

### .bablerc

.bablerc 文件内就是 babel-loader 中 options 的内容

## Tree shaking

### 作用

Tree shaking 是一种优化技术，用于减小 JavaScript 或其他编程语言中的代码包的体积。它通过静态分析代码，识别出未使用的代码，并将其从最终的构建输出中删除，以减少文件大小

### 原理

通过静态分析代码，确定哪些代码被实际使用，哪些代码是不可达的。它会从入口文件开始，追踪代码的依赖关系，并标记未使用的代码。通过构建工具将未使用的代码从最终的构建输出中删除，只保留实际使用的代码

### 注意

Tree shaking 只支持 ES Module 的引入方式

### 使用

#### 开发环境

1. 配置 optimization

   ```js
   module.exports = {
     optimization: {
       usedExports: true
     }
   }
   ```

2. 在 package.json 中设置 sideEffects

   ```json
   {
     "sideEffects": ["*.css", "@xxx"] // 表示对哪些文件不做处理，没有限制时为 false
   }
   ```

#### 生产环境

无需配置自动开启 Tree shaking

## Code Splitting（代码分包）
