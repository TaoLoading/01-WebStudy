import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HpmeComponent } from './components/hpme/hpme.component';

import { RequestService } from './services/request.service'

@NgModule({
  declarations: [
    AppComponent,
    HpmeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
