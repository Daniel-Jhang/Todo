import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from './services/to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  
  // 宣告變數
  title = 'ToDoList';

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

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
  }
}
