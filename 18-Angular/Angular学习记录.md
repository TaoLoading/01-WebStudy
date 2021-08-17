# Angular学习记录

## 一、基本命令

1. 安装Angular CLI：
    * `npm install -g @angular/cli`
    * `cnpm install -g @angular/cli`
2. 检查Angular版本
    * `ng v`
3. 新建项目：
    * `ng new 项目名`
    * 跳过包安装：`ng new 项目名 --skip-install`
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
    1.  在app.module.ts文件中引入并在imports中声明FormsModule
    2.  `[(ngModel)]='变量'`

## 四、服务
1. 在services文件夹中创建服务
    * `ng g service services/组件名`
2. 引入服务
    1. 在app.module.ts文件中引入并在providers中声明服务名称
    2. 在使用服务的组件内再次引入服务
3. 使用服务
    1. 在constructor中，`xx:服务名称`
    2. 使用`this.xx`调用

## 五、操作DOM
1. ViewChild获取DOM
    1. 在html中对DOM进行标记`#标记名称`
    2. 在ts文件内引入ViewChild
    3. 使用`@ViewChild('标记名称') 变量名称`将DOM赋给变量
2. 在ngAfterViewInit()操作DOM
    * 在ngAfterViewInit()生命周期内使用`this.变量名称.nativeElement`操作DOM
3. 注意
    * 可在ngAfterViewInit()生命周期内操作DOM，此阶段是视图/DOM加载完成后触发的方法
    * 不可在ngOnInit()生命周期内操作DOM，此阶段是组件和指令的初始化完成，并不是真正的DOM加载完成
    * ViewChild不止可以获取DOM，也可以获取组件