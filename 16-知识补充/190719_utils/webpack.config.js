const path = require('path')

module.exports = {
  // 模式
  mode: 'development', // 开发的模式
  // mode: 'production', // 开发的模式

  // 入口
  entry: './src/main.js',

  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '190719-utils.js',
    // filename: '190719-utils.min.js',
    // 向外暴露的对象的名称
    library: 'aUtils',
    // 打包生成的库可以通过esm、commonjs、requirejs的语法引入
    libraryTarget: 'umd',
  },

  // 配置引入的外部包
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      // 页面引入的全局变量
      root: '_'
    }
  }
}