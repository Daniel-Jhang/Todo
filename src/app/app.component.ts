import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITodo, TodoStatusType } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  todoDataList: ITodo[] = [];
  ngOnInit(): void {
    this.http.get<any>('/api/TodoList').subscribe((response) => {
      if (response.isSuccess) {
        this.todoDataList = response.data.map((item: any) => {
          return {
            Status: item.status,
            Context: item.context,
            Editing: item.editing,
          };
        });
      } else {
        console.error(response.errorMessage);
      }
    });
  }

  title = 'ToDoList';
  placeholder = 'what needs to be done today??';
  attributeBinding = 'attributeBindingTest';

  // 事件繫結-元素click事件呼叫ts的函式
  toggleAllBtn = false;

  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach((data) => {
      data.Status = this.toggleAllBtn;
    });
  }

  clickCheck(item: ITodo) {
    // Interface的寫法
    item.Status = !item.Status;

    if (this.todoCompleted.length === this.todoDataList.length) {
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  delete(todo: ITodo) {
    // splice(index: 第幾個位置, deleteCount: 刪除幾個物件)
    this.todoDataList = this.todoDataList.filter((data) => data !== todo);
  }

  // Interface的寫法
  add(input: HTMLInputElement) {
    const newTodoContext: ITodo = {
      Status: false,
      Context: input.value,
      Editing: false,
    };
    this.http.post<any>('/api/TodoList', newTodoContext).subscribe();
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

  setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
  }

  get nowTodoList(): ITodo[] {
    let list: ITodo[] = [];

    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list = this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.todoDataList;
        break;
    }
    return list;
  }

  // 取得已未完成的 todo list
  get todoActive(): ITodo[] {
    return this.todoDataList.filter((data) => data.Status == false);
  }

  // 取得已完成的 todo list
  get todoCompleted(): ITodo[] {
    return this, this.todoDataList.filter((data) => data.Status == true);
  }

  ClearCompleted() {
    this.todoDataList = this.todoActive;
  }

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
  }
}