import { Component } from '@angular/core';
import { ITodo } from './models/todo.model';

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

  // class的寫法
  // todoDataList: Todo[] = ([
  //   {
  //     Status: true,
  //     Context: '第一件事情',
  //   },
  //   {
  //     Status: false,
  //     Context: '第二件事情',
  //   },
  //   {
  //     Status: false,
  //     Context: '第三件事情',
  //   },
  //   // map()是RxJS語法，有空可以研究一下
  // ]).map(data => new Todo(data.Status, data.Context));

  // Interface的寫法
  todoDataList: ITodo[] = ([
    {
      Status: true,
      Context: '第一件事情',
      Editing: false
    },
    {
      Status: false,
      Context: '第二件事情',
      Editing: false
    },
    {
      Status: false,
      Context: '第三件事情',
      Editing: false
    },
  ]);

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach((data) => {
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

  clickCheck(item: ITodo) {
    // class的寫法
    // item.toggle();


    // Interface的寫法
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

  delete(index: number) {
    // splice(index: 第幾個位置, deleteCount: 刪除幾個物件)
    this.todoDataList.splice(index, 1);
  }

  // class的寫法
  // add(input: HTMLInputElement) {
  //   this.todoDataList.push(new Todo(false, input.value));
  //   input.value = '';
  // }

  // Interface的寫法
  add(input: HTMLInputElement) {
    const newTodoContext: ITodo = {
      Status: false,
      Context: input.value,
      Editing: false
    };
    this.todoDataList.push(newTodoContext);
    input.value = '';
  }

  edit(item: ITodo) {
    item.Editing = true;
  }

  update(item: ITodo, newValue: string) {
    item.Context = newValue;
    item.Editing = false;
  }

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
  }
}
