import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 引入HttpClientModule，实现发生请求
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { RequestService } from './services/request.service';
import { NewsComponent } from './components/news/news.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
