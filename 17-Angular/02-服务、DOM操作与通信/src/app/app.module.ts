import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';

import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component'

// 引入StorageService服务
import { StorageService } from './services/storage.service'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
