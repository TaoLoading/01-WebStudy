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

用于对不同类型的文件进行加载和转换

在 module 中配置，使用多个 loader 时，loader 的执行顺序为从下到上，从右到左

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

### 常用的 loader

1. babel-loader：将 ES6+的 JavaScript 代码转换为 ES5 兼容的代码
2. css-loader：解析 css 文件中的@import 和 url 语句，处理 css-modules，并将结果作为一个 js 模块返回
3. sass-loader：将 Sass 或 Scss 文件转换为 CSS
4. file-loader：处理文件，将文件复制到输出目录，并返回文件的 URL 路径

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

### 常用的 plugin

1. MiniCssExtractPlugin：对 css 文件进行代码分包
2. SplitChunksPlugin：对 js 文件进行代码分包
3. CleanWebpackPlugin：打包前清理输出目录，保证每次都是最新的打包文件

### loader 和 plugin 的区别

loader 是用于处理文件内容的转换；而 plugin 是用于丰富 webpack 的功能，如优化输出结果、资源管理、注入环境变量等，可以在 webpack 不同的生命周期阶段执行特定的功能

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

## Babel

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

### .babelrc

.babelrc 文件内就是 babel-loader 中 options 的内容

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

### 概念

代码分割（Code splitting）是一种将应用程序的代码分割成多个较小文件的技术，有助于优化应用程序的加载性能。不仅限于 Webpack 中

### Webpack 中使用代码分包

1. 方式 1：无需配置实现代码分包（只针对异步导入的代码）

   ```js
   import('./module')
     .then(module => {
       // 使用加载的模块
     })
     .catch(error => {
       // 处理加载失败的情况
     })
   ```

2. 方式 3：使用 MiniCssExtractPlugin 和 SplitChunksPlugin 插件实现代码分包

   1. MiniCssExtractPlugin：用于将 CSS 代码从打包生成的 JavaScript 文件中提取出来，生成独立的 CSS 文件

      ```js
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      
      module.exports = {
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
          ]
        },
        plugins: [new MiniCssExtractPlugin()]
      }
      ```

   2. SplitChunksPlugin：用于将公共的 js 模块（包括代码和依赖）提取出来，生成单独的文件，用于缓存和复用（同步异步都可，配置 chunks）

      ```js
      module.exports = {
        optimization: {
          splitChunks: {
            chunks: 'all',
            // 下列配置可不显式配置，使用默认项即可
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        }
      }
      ```

## 懒加载

### 概念

懒加载是一种优化技术，用于延迟加载模块，直到其真正需要使用时才进行加载

### 使用

异步引入模块即可实现懒加载

```js
import('./module')
  .then(module => {
    // 使用加载的模块
  })
  .catch(error => {
    // 处理加载失败的情况
  })

// 或

async function getModule() {
  const xxx = await import('./module')
}
```

## webpackPrefetch 和 webpackPreload

### webpackPrefetch

#### 概念

prefetch（预取）用于在浏览器**空闲时**提前加载某些资源

#### 使用

```js
import(/* webpackPrefetch: true */ './myModule.js')
```

### webpackPreLoad

#### 概念

preload（预加载）用于在当前页面**加载完成后**，预加载其他页面可能需要的资源

#### 使用

```js
import(/* webpackPreload: true */ './myModule.js')
```

## 手写 loader

### 实现 loader

```js
/**
 * 自定义 loader：文本转大写
 * @param {*} source 资源文件内容，表示待处理的源代码或文件内容
 * @param {*} map 资源文件的源映射
 * @param {*} meta 源文件的附加信息
 */
module.exports = function (source, map, meta) { // 不可使用箭头函数，因为 webpack 会对 this 进行处理以获取某些方法或变量
  const uppercaseText = source.toUpperCase()
  return uppercaseText
}
```

### 使用 loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/, // 匹配的文件类型
        use: [
          {
            loader: path.resolve(__dirname, '自定义 loader 的路径')
          }
        ]
      }
    ]
  }
}
```

## 手写 plugin

### 实现 plugin

```js
/**
 * 自定义 plugin：打包完成后生成一个版权文件
 */
const fs = require('fs')

class CopyrightPlugin {
  constructor(options) {
    // 插件的配置选项
    this.options = options
  }

  /**
   * apply() 是插件的入口点，webpack 在启动时会调用该方法
   * @param {*} compiler // webpack 的实例。包含了 webpack 的配置信息、各种钩子函数以及其他与构建相关的功能
   */
  apply(compiler) {
    compiler.hooks.done.tap('CopyrightPlugin', (stats) => {
      const { output } = stats.compilation.options
      const { author, year } = this.options

      const content = `/**\n * Copyright (c) ${year} ${author}\n */`

      fs.writeFileSync(`${output.path}/copyright.txt`, content)
    })
  }
}

module.exports = CopyrightPlugin
```

### 使用 plugin

```js
const CopyrightPlugin = require('自定义 loader 的路径')

module.exports = {
  plugins: [
    new CopyrightPlugin({
      author: 'TaoLoading',
      year: '2023'
    })
  ]
}
```

