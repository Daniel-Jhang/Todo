import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 需要加入動畫模組
import { ToastrModule } from 'ngx-toastr'; // 引入 ngx-toastr

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // 記得加入 BrowserAnimationsModule
    ToastrModule.forRoot(), // 初始化 ngx-toastr 模組
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
