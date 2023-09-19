import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITodo, TodoStatusType } from './models/todo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // 建構式
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // 宣告變數
  title = 'ToDoList';
  placeholder = 'what needs to be done today??';
  attributeBinding = 'attributeBindingTest';
  toggleAllBtn = false; // 事件繫結-元素click事件呼叫ts的函式
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;
  todoDataList: ITodo[] = [];

  ngOnInit(): void {
    this.getData();
  }

  add(input: HTMLInputElement) {
    const newTodoContext: ITodo = {
      TodoId: '',
      Status: false,
      Context: input.value,
      Editing: false,
    };
    this.http
      .post<any>('/api/TodoList', newTodoContext)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.todoDataList.push({
            TodoId: response.data.todoId,
            Status: response.data.status,
            Context: response.data.context,
            Editing: response.data.editing,
          });
          // 顯示新增成功的 toast message
          this.toastr.success('新增成功', 'Success', {
            timeOut: 3000, // 可自訂顯示時間
          });
          console.log(response.isSuccess);
          console.log(this.todoDataList);
        } else {
          // 顯示新增失敗的 toast message
          this.toastr.error('新增失敗', 'Error', {
            timeOut: 3000, // 可自訂顯示時間
          });
        }
      });
    input.value = '';
  }

  getData() {
    this.http.get<any>('/api/TodoList').subscribe((response) => {
      if (response.isSuccess) {
        this.todoDataList = response.data.map((item: any) => {
          return {
            TodoId: item.todoId,
            Status: item.status,
            Context: item.context,
            Editing: item.editing,
          };
        });
        // 顯示查詢成功的 toast message
        this.toastr.success('查詢成功', 'Success', {
          timeOut: 3000, // 可自訂顯示時間
        });
        console.log(this.todoDataList);
      } else {
        // 顯示查詢失敗的 toast message
        this.toastr.error('查詢失敗', 'Error', {
          timeOut: 3000, // 可自訂顯示時間
        });
        console.error(response.errorMessage);
      }
    });
  }

  update(item: ITodo) {
    this.http.put<any>('/api/TodoList', item).subscribe(
      (response) => {
        item.Editing = false;
        // 顯示更新成功的 toast message
        this.toastr.success('更新成功', 'Success', {
          timeOut: 3000, // 可自訂顯示時間
        });
      },
      (error) => {
        // 顯示更新失敗的 toast message
        this.toastr.error('更新失敗', 'Error', {
          timeOut: 3000, // 可自訂顯示時間
        });
      }
    );
  }

  delete(todo: ITodo) {
    // splice(index: 第幾個位置, deleteCount: 刪除幾個物件)
    this.todoDataList = this.todoDataList.filter((data) => data !== todo);
  }

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

  edit(item: ITodo) {
    item.Editing = true;
  }

  setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
  }

  ClearCompleted() {
    this.todoDataList = this.todoActive;
  }

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
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
}
