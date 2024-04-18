import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr'; // 引入 ngx-toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 需要加入動畫模組
import { LabComponent } from './lab/lab.component'; // 加入 Lab Component
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { HeroComponent } from './hero/hero.component';
import { HeroParentComponent } from './hero/hero-parent/hero-parent.component';
import { HeroChildComponent } from './hero/hero-child/hero-child.component';
import { VoterComponent } from './voter/voter.component';
import { VoterChildComponent } from './voter/voter-child/voter-child.component';
import { VoterParentComponent } from './voter/voter-parent/voter-parent.component';
import { HeaderComponent } from './to-do-list/header/header.component';
import { SectionComponent } from './to-do-list/section/section.component';
import { FooterComponent } from './to-do-list/footer/footer.component';
import { TodoInfoModalComponent } from './to-do-list/section/todo-info-modal/todo-info-modal.component'; // 加入 To-Do List Component


@NgModule({
  declarations: [
    AppComponent,
    LabComponent,
    ToDoListComponent,
    HeroComponent,
    HeroParentComponent,
    HeroChildComponent,
    VoterComponent,
    VoterChildComponent,
    VoterParentComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,
    TodoInfoModalComponent,
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
