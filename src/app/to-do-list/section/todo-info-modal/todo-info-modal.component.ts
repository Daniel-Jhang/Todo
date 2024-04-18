import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../../@models/to-do-list.model';

@Component({
  selector: 'app-todo-info-modal',
  templateUrl: './todo-info-modal.component.html',
  styleUrls: ['./todo-info-modal.component.scss'],
})
export class TodoInfoModalComponent implements OnInit {
  todoInfoModal: any;
  @Input() todo!:ITodo

  constructor() {}

  ngOnInit(): void {}

  show() {
    if (!this.todoInfoModal) {
      this.todoInfoModal = new bootstrap.Modal(
        document.getElementById('todoInfoModal'),
        {
          keyboard: false,
        }
      );
    }
    this.todoInfoModal.show();
  }
}
