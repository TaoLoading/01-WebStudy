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
