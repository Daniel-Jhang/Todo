import { Component, OnInit } from '@angular/core';
import { ITodo, TodoStatusType } from '../@models/to-do-list.model';
import { TodoService } from '../services/to-do-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // 變數宣告
  TodoStatusType = TodoStatusType;

  // 取得已未完成的 todo list
  get todoActive(): ITodo[] {
    return this.todoService.todoActive;
  }

  // 取得已完成的 todo list
  get todoCompleted(): ITodo[] {
    return this.todoService.todoCompleted;
  }

  get nowTodoStatusType() {
    return this.todoService.nowTodoStatusType;
  }

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  setTodoStatusType(type: number) {
    this.todoService.setTodoStatusType(type);
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
}
