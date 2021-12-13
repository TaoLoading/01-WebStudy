/**
 * custom.d.ts文件为ts的自定义全局接口
 * 只包含类型声明，不包含逻辑
 * 不会被编译，也不会被webpack打包
 * 
 * 
 * 此文件作用为对css文件定义声明
 * 此声明为：导出key所在的对象，原始类名和相应值都会被转换成这个对象
 */

declare module '*.css' {
  const css: { [key: string]: string }
  export default css
}