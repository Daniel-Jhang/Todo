import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../services/to-do-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;

  //待處理
  attributeBinding = 'attributeBindingTest';

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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
}
