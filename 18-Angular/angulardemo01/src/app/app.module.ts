/* 这个文件是angular根模块，告诉angular如何组装应用 */

// angular核心模块
import { NgModule } from '@angular/core';
// 浏览器解析模块
import { BrowserModule } from '@angular/platform-browser';
// 根组件
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
// 实现双向数据绑定
import { FormsModule } from '@angular/forms'

// 装饰器。接收一个对象，告诉angular如何编译和启动应用
@NgModule({
  // 配置当前项目运行的组件
  declarations: [
    AppComponent,
    NewsComponent,
    HomeComponent
  ],
  // 配置当前模块运行依赖的其他模块
  imports: [
    BrowserModule,
    FormsModule
  ],
  // 配置项目所需要的服务
  providers: [],
  // 指定应用的主视图（成为根组件），通过引导AppModule来启动应用
  bootstrap: [AppComponent]
})

// 向外暴露。跟模块不需要向外暴露，因为其他组件不需要引入跟模块
export class AppModule { }
