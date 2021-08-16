# Angular学习记录

## 一、基本命令

1. 安装Angular CLI：
   * `npm install -g @angular/cli`
   * `cnpm install -g @angular/cli`
2. 检查Angular版本
   * `ng v`
3. 新建项目：
   * `ng new 项目名`
   * 跳过包安装：`ng new 项目名 --skip-instal`
4. 启动项目：
   * `ng serve --open`
5. 在components文件夹中创建组件
   * `ng g component components/组件名`

## 二、组件开发基本流程

1. 创建组件
2. 在app.module.ts中引入并配置组件(使用命令创建组件时自动配置)
3. 