import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  // 宣告變數
  title = 'ToDoList';

  // 建構式
  constructor() {}

  ngOnInit() {}

  // btnFun(event: MouseEvent) {
  //   alert('123');
  //   console.log(event);
  // }
}
