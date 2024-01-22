import { Component, OnInit } from '@angular/core';
import { ITodo, TodoStatusType } from '../models/todo.model';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  // 宣告變數
  title = 'ToDoList';
  placeholder = 'what needs to be done today??';
  TodoStatusType = TodoStatusType;

  get nowTodoList(): ITodo[] {
    return this.todoService.nowTodoList;
  }

  // 取得已未完成的 todo list
  get todoActive(): ITodo[] {
    return this.todoService.todoActive;
  }

  // 取得已完成的 todo list
  get todoCompleted(): ITodo[] {
    return this.todoService.todoCompleted;
  }

  get toggleAllBtn() {
    return this.todoService.toggleAllBtn;
  }

  get nowTodoStatusType() {
    return this.todoService.nowTodoStatusType;
  }

  //待處理
  attributeBinding = 'attributeBindingTest';

  // 建構式
  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // 取得資料
    this.todoService.getData().subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('取得資料成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('取得資料失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  // 新增資料
  add(input: HTMLInputElement) {
    this.todoService.create(input).subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('新增資料成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('新增資料失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
    input.value = '';
  }

  // 更新資料
  update(item: ITodo) {
    this.todoService.update(item).subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('更新資料成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('更新資料失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  // 更新資料狀態
  clickCheck(item: ITodo) {
    this.todoService.clickCheck(item).subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('更新資料狀態成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('更新資料狀態失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  // 更新所有資料狀態(全部狀態統一)
  toggleAll() {
    this.todoService.toggleAll().subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('更新所有資料狀態成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('更新所有資料狀態失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  // 刪除資料
  delete(todo: ITodo) {
    this.todoService.delete(todo).subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('刪除資料成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('刪除資料失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  // 刪除資料(刪除已完成事項)
  clearCompleted() {
    this.todoService.clearCompleted().subscribe((success: boolean) => {
      if (success) {
        this.toastr.success('刪除資料成功', 'Success', {
          timeOut: 2000,
        });
      } else {
        this.toastr.error('刪除資料失敗', 'Error', {
          timeOut: 2000,
        });
      }
    });
  }

  edit(item: ITodo) {
    //修改add()方法後，這邊要同步新增判斷
    // if(item.CanEdit){}
    item.Editing = true;
  }

  setTodoStatusType(type: number) {
    this.todoService.setTodoStatusType(type);
  }

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
  }
}
