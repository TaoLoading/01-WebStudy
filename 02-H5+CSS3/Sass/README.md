# Sass

## 后缀
Sass后缀有.scss和.sass，两者统称为Sass，区别是.sass书写时严格遵循缩进，不可加大括号和分号，而.scss书写时类似css

## 编译
使用Live Sass Compiler自动编译sass文件，若想忽略编辑某个文件则在其名字前加上下划线_

## 文件引入
使用@import '文件名'引入sass文件

## 嵌套语法
层级嵌套

## Mixin混入
使用@mixin和@include实现代码复用，可传参

## @content
向混合样式中导入内容，注意和@mixin传参区分