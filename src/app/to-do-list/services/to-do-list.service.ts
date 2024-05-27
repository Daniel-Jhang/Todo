import { Injectable } from '@angular/core';
import { TodoStatusType, ITodo } from '../@models/to-do-list.model';
import { TodoApiService } from './to-do-list-request.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // 宣告變數
  toggleAllBtn = false; // 事件繫結-元素click事件呼叫ts的函式
  nowTodoStatusType = TodoStatusType.All;
  todoDataList: ITodo[] = [];

  get nowTodoList() {
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

  // 建構式
  constructor(private todoApiService: TodoApiService) {
    this.getData();
  }

  // 新增資料
  create(value: string): Observable<boolean> {
    const seqNo = new Date().getSeconds();
    const newTodoContext: ITodo = {
      TodoId: '',
      Status: false,
      Context: value,
      Editing: false,
      CanEdit: false,
      SeqNo: seqNo,
      CreateTime: new Date(),
    };
    // 為提升使用者體驗(新增的待辦事項"立即"顯示在清單上)，避免網路或其他因素造成的體感延遲
    // 這邊先將新增的待辦事項push到畫面上
    this.todoDataList.push(newTodoContext);

    // 此時才將request打到後端去新增TodoList
    return this.todoApiService.createData(newTodoContext).pipe(
      tap((response) => {
        if (response.isSuccess) {
          // 若後端新增成功，則根據SeqNo將CanEdit屬性改成true
          const todoId = response.data.todoId;
          const updatedTodo = this.todoDataList.find(
            (todo) => todo.SeqNo === newTodoContext.SeqNo
          );
          if (updatedTodo) {
            updatedTodo.TodoId = todoId;
            updatedTodo.CanEdit = true;
          }
          console.log(this.todoDataList);
        } else {
          console.error(
            `錯誤訊息: ${response.errorMessage}, 細節描述:${response.errorDetail}`
          );
        }
      }),
      map((response) => response.isSuccess) // 返回操作是否成功的布林值
    );
  }

  // 取得資料
  getData(): Observable<boolean> {
    return this.todoApiService.getData().pipe(
      map((response) => {
        if (response.isSuccess) {
          this.todoDataList = response.data;
          this.todoDataList.forEach((item) => {
            item.CanEdit = true;
            item.Editing = false;
          });
          console.log(this.todoDataList);
          this.checkToggleAllBtn();
          return true;
        } else {
          console.error(
            `錯誤訊息: ${response.errorMessage}, 細節描述:${response.errorDetail}`
          );
          return false;
        }
      })
    );
  }

  // 更新資料
  update(item: ITodo): Observable<boolean> {
    return this.todoApiService.updateDate(item).pipe(
      map((response) => {
        if (response.isSuccess) {
          item.Editing = false;
          return true;
        } else {
          console.error(
            `錯誤訊息: ${response.errorMessage}, 細節描述:${response.errorDetail}`
          );
          return false;
        }
      })
    );
  }

  // 更新資料狀態
  clickCheck(item: ITodo): Observable<boolean> {
    item.Status = !item.Status;
    return this.update(item);
  }

  // 更新所有資料狀態(全部狀態統一)
  toggleAll(): Observable<boolean> {
    // 取得與目前相反的狀態
    this.toggleAllBtn = !this.toggleAllBtn;
    // 先更新畫面顯示的狀態
    this.todoDataList.forEach((data) => {
      data.Status = this.toggleAllBtn;
    });
    // 在更新資料庫
    return this.todoApiService.toggleAll(this.toggleAllBtn).pipe(
      map((response) => {
        if (response.isSuccess) {
          this.checkToggleAllBtn();
          return true;
        } else {
          console.error(
            `錯誤訊息: ${response.errorMessage}, 細節描述:${response.errorDetail}`
          );
          return false;
        }
      })
    );
  }

  // 刪除資料
  delete(item: ITodo): Observable<boolean> {
    return this.todoApiService.deleteData(item).pipe(
      map((response) => {
        if (response.isSuccess) {
          this.todoDataList = this.todoDataList.filter((data) => data !== item);
          return true;
        } else {
          console.error(
            `錯誤訊息: ${response.errorMessage}, 細節描述:${response.errorDetail}`
          );
          return false;
        }
      })
    );
  }

  // 刪除資料(刪除已完成事項)
  clearCompleted(): Observable<boolean> {
    const completedIds = this.todoDataList
      .filter((data) => data.Status)
      .map((data) => data.TodoId);

    return this.todoApiService.clearCompleted(completedIds).pipe(
      map((response) => {
        if (response.isSuccess) {
          // TODO: 改用後端return回來的data渲染
          this.todoDataList = this.todoActive;
          return true;
        } else {
          console.error(
            `錯誤訊息: ${response.errorMessage}, 細節描述:${response.errorDetail}`
          );
          return false;
        }
      })
    );
  }

  checkToggleAllBtn() {
    if (this.todoCompleted.length === this.todoDataList.length) {
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
  }

  btnFun(event: MouseEvent) {
    alert('123');
    console.log(event);
  }
}
