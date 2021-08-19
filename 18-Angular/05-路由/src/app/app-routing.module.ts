/* 路由配置文件 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1.引入创建好的组件
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'news/:id',
    component: NewsComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
