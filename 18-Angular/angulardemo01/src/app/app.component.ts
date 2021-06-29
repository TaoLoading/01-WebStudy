// 引入核心模块里的component
import { Component } from '@angular/core';

@Component({
  // 使用这个组件的名称
  selector: 'app-root',
  // html
  templateUrl: './app.component.html',
  // css
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 定义属性
  title = 'angulardemo01';
}
