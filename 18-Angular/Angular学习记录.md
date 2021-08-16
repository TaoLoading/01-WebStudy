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
3. 在ts文件中定义变量，在html文件中使用，声明变量类型的几种方式：
    * public      共有类型(默认)
    * protected   保护类型
    * private     私有类型

## 三、基础语法
1. 绑定数据
    * 绑定数据时采用双大括号
    * `<h3>{{infoData}}</h3>`
2. 绑定属性
    * 绑定属性时对属性使用中括号包裹，对属性的数据直接调用
    * `<div [title]="infoProp">鼠标瞄上去看一下</div>`
3. 绑定html
    * 绑定html时使用[innerHTML]声明
    * `<div [innerHTML]='infoHtml'></div>`
4. 遍历数组
    * `*ngFor`
    * `<li *ngFor="let item of infoArr">{{item}}</li>`
5. 条件判断
    * `*ngIf="flag"`
    * `*ngSwitch="flag"`
6. 属性设置
    * `[ngClass]`
    * `[ngClass]="{'red': true}"`
    * `[ngStyle]`
    * `[ngStyle]="{'color': 'blue'}"`
7. 管道
    * 数据格式化展示工具
    * {{ 需要格式化的信息 | 格式化规则 }}
8. 点击事件
    * `(click)="方法"`
9. 键盘事件
    * `(keydown)="方法"`
10. 双向数据绑定