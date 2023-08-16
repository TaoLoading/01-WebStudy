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
