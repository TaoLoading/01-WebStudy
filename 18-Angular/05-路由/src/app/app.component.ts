import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angulardemo';

  constructor(public router: Router) { }

  junpToNews() {
    // 动态路由的跳转
    this.router.navigate(['/news', '123'])
  }

  jumpToHome() {
    // get传值路由的跳转
    // 1.使用NavigationExtras确定参数
    let queryParams: NavigationExtras = {
      queryParams: { 'id': 13 }
    }
    this.router.navigate(['/home'], queryParams)
  }
}
