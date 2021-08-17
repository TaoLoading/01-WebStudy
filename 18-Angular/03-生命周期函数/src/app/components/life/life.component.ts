import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life',
  templateUrl: './life.component.html',
  styleUrls: ['./life.component.scss']
})
export class LifeComponent implements OnInit {
  public msg: string = '我是一条信息'

  // 除了使用简单的值对局部变量进行初始化之外，什么都不应该做
  constructor() {
    console.log('00-构造函数执行了')
  }

  // 当被绑定的输入属性的值发生变化时调用(父子组件传值时会触发)
  ngOnChanges(): void {
    console.log('01-ngOnChanges执行了')
  }

  // 请求数据一把放在这个里面
  ngOnInit(): void {
    console.log('02-ngOnInit执行了')
  }

  // 检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。
  ngDoCheck(): void {
    console.log('03-ngDoCheck执行了')
  }

  // 当把内存投影进组件时调用
  ngAfterContentInit(): void {
    console.log('04-ngAfterContentInit执行了')
  }

  // 每次完成被投影组件内容的变更检测之后调用
  ngAfterContentChecked(): void {
    console.log('05-ngAfterContentChecked执行了')
  }

  // 初始化完组件视图及其子视图之后调用
  ngAfterViewInit(): void {
    console.log('06-ngAfterViewInit执行了')
  }

  // 每次做完组件视图和子视图的变更检测之后调用
  ngAfterViewChecked(): void {
    console.log('07-ngAfterViewChecked执行了')
  }

  // 每当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏
  ngOnDestroy(): void {
    console.log('08-ngOnDestroy执行了')
  }

  change() {
    this.msg = '数据已改变，观察生命周期的变化'
  }
}
