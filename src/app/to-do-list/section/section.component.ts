import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/to-do-list.service';
import { ToastrService } from 'ngx-toastr';
import { ITodo } from '../@models/to-do-list.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  nowSelectTodo!: ITodo;

  get toggleAllBtn() {
    return this.todoService.toggleAllBtn;
  }

  get nowTodoList() {
    return this.todoService.nowTodoList;
  }

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.todoService.getData().subscribe((success) => {
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
    console.log(this.nowTodoList); // 檢查待辦事項清單數據
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

  // 編輯資料
  edit(item: ITodo) {
    //修改add()方法後，這邊要同步新增判斷
    if (item.CanEdit) {
      item.Editing = true;
    }
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
}
