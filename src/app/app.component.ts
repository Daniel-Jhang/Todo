import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ToDoList';
  placeholder = 'what needs to be done today??';
  attributeBinding = 'attributeBindingTest';

  // 事件繫結-元素click事件呼叫ts的函式
  toggleAllBtn = false;

  // 使用ngFor精簡程式碼
  // check1 = false;
  // check2 = false;
  // class繫結-精簡程式碼
  // classCompleted1 = '';
  // classCompleted2 = '';

  todoDataList = [
    {
      Status: true,
      Context: '第一件事情',
    },
    {
      Status: false,
      Context: '第二件事情',
    },
    {
      Status: false,
      Context: '第三件事情',
    },
  ];

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach(data => {
      data.Status = this.toggleAllBtn;
    });

    // 使用ngFor精簡程式碼
    // this.check1 = this.toggleAllBtn;
    // this.check2 = this.toggleAllBtn;
    // class繫結-精簡程式碼
    // if (this.toggleAllBtn) {
    //   this.classCompleted1 = 'completed smallText';
    //   this.classCompleted2 = 'completed smallText';
    // } else {
    //   this.classCompleted1 = '';
    //   this.classCompleted2 = '';
    // }
  }

  clickCheck(item: any) {
    item.Status = !item.Status;
  }

  // 使用ngFor精簡程式碼
  // clickCheck1() {
  //   this.check1 = !this.check1;

  //   // class繫結-精簡程式碼
  //   // if (this.check1) {
  //   //   this.classCompleted1 = 'completed smallText';
  //   // } else {
  //   //   this.classCompleted1 = '';
  //   // }
  // }

  // 使用ngFor精簡程式碼
  // clickCheck2() {
  //   this.check2 = !this.check2;

  //   // class繫結-精簡程式碼
  //   // if (this.check2) {
  //   //   this.classCompleted2 = 'completed smallText';
  //   // } else {
  //   //   this.classCompleted2 = '';
  //   // }
  // }

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
  }
}
