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
    1. 在app.module.ts文件中引入并在providers中声明服务名
    2. 在使用服务的组件内再次引入服务
3. 使用服务
    1. 在constructor中，`public xx:服务名`
    2. 使用`this.xx`调用

## 五、操作DOM
1. ViewChild获取DOM
    1. 在html中对DOM进行标记`#标记名`
    2. 在ts文件内引入ViewChild
    3. 使用`@ViewChild('标记名') 变量名`将DOM赋给变量
2. 在ngAfterViewInit()操作DOM
    * 在ngAfterViewInit()生命周期内使用`this.变量名.nativeElement`操作DOM
3. 注意
    * 可在ngAfterViewInit()生命周期内操作DOM，此阶段是视图/DOM加载完成后触发的方法
    * 不可在ngOnInit()生命周期内操作DOM，此阶段是组件和指令的初始化完成，并不是真正的DOM加载完成
    * ViewChild不止可以获取DOM，也可以获取组件(子向父通信)
    * 
## 六、组件间的通信
1. 父向子 @Input()
    1. 父向子传递数据`[属性名]='数据'`；传递方法`[属性名]='方法名'`，注意传递方法时不加括号；传递组件`[属性名]='this'`
    2. 子组件引入Input
    3. 子组件接收数据`@Input() 属性名`
2. 子向父
    1. @ViewChild
    2. @Output
       1. 子组件引入Output、EventEmitter
       2. 子组件中实例化EventEmitter`@Output() private 变量名=new EventEmitter<string>()`
       3. 子组件向父组件广播数据`this.变量名.emit('数据')`
       4. 父组件接收数据，在子组件标签内`(变量名)=方法()`
3. 非父子组件
   1. service服务

## 七、组件的生命周期函数
1. ngOnChanges()
2. ngOnInit()
    * 在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件
    * 在此阶段请求数据
3. ngDoCheck()
4. ngAfterContentInit()
5. ngAfterContentChecked()
6. ngAfterViewInit()
    * 当Angular初始化完组件视图及其子视图或包含该指令的视图之后调用
    * 在此阶段操作DOM
7. ngAfterViewChecked()
8. ngOnDestroy()
    * 每当Angular每次销毁指令/组件之前调用并清扫。在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏

## 八、Rxjs
1. Rxjs处理异步
    1. 在用到的地方引入Observable`import { Observable } from 'rxjs'`
    2. 实例化Observable`new Observable((xx)=>{})`
      * 成功的回调`xx.next()`
      * 失败的回调`xx.error()`
    3. 在用到的页面获取返回的Observable对象，并使用subscribe接收数据
    4. 使用unsubscribe取消订阅
    5. Rxjs可以多次执行，Promise不行
2. 6.x及以后版本使用工具函数
    1. 引入工具函数，如`import { map, filter } from 'rxjs/operators'` 
3. 6.x之前版本使用工具函数
    * Angular6以后用的是rxjs方法，之前使用的是Rxjs的工具函数map filter，若要使用之前的方法则需要安装rxjs-compat模块

## 九、请求数据
1. 在app.module.ts中引入HttpClientModule并在imports中注入`import { HttpClientModule } from '@angular/common/http'`
2. 在用到的地方引入HttpCilent / HttpHeaders(post请求需要) 并在构造函数中声明
    1. `import { HttpClient, HttpHeaders } from '@angular/common/http'`
    2. 在构造函数中声明使用`public xx:HttpClient`
3. 发送请求
    * get请求`this.http.get(api).subscribe((res) => {回调})`
    * post请求，与get请求类似，但需要传入请求头
      1. 定义请求头`const httpOptions = {headers: new HttpHeaders({ 'Content-Type':'application/json' })}`
      2. 发送请求`this.http.post( api,{数据}, httpOptions ).subscribe((res) => {回调})`