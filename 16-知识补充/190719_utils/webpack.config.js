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
    library: 'aUtils', // 向外暴露的对象的名称
    libraryTarget: 'umd', // 针对 esm / commonjs
  }
}