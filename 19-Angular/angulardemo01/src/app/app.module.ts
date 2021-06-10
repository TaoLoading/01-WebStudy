// angular核心模块
import { NgModule } from '@angular/core';
// 浏览器解析模块
import { BrowserModule } from '@angular/platform-browser';
// 根组件
import { AppComponent } from './app.component';
// 引入所需组件
import { NewsComponent } from './components/news/news.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms'

// @NgModule装饰器，接收一个元数据对象，告诉angular如何编译和启动应用
@NgModule({
  // 配置当前项目运行的组件
  declarations: [
    AppComponent,
    NewsComponent,
    HeaderComponent,
    FormComponent
  ],
  // 配置当前模块运行依赖的其他模块
  imports: [
    BrowserModule,
    FormsModule
  ],
  // 配置项目所需要的五福
  providers: [],
  // 指定应用的主视图
  bootstrap: [AppComponent]
})
export class AppModule { }
