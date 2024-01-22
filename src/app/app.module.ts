import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; // 引入 ngx-toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';// 需要加入動畫模組


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // 記得加入 BrowserAnimationsModule
    ToastrModule.forRoot(), // 初始化 ngx-toastr 模組
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
