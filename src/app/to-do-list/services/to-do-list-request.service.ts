import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../@models/to-do-list.model';
import { IApiResultModel } from '../@models/apiResultData.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private http: HttpClient) {}
  private apiUrl = '/api/TodoList';

  // 新增資料
  createData(value: any) {
    return this.http.post<IApiResultModel>(this.apiUrl, value);
  }
  // 取得資料
  getData() {
    return this.http.get<IApiResultModel>(this.apiUrl);
  }
  // 更新資料
  updateDate(value: any) {
    return this.http.put<IApiResultModel>(this.apiUrl, value);
  }
  // 更新所有資料狀態(全部狀態統一)
  toggleAll(value: boolean) {
    const params = new HttpParams().set('status', value);
    // HttpClient的put()方法參數與其他不同，地2個參數為 body，須注意參數傳入的順序
    return this.http.put<IApiResultModel>(`${this.apiUrl}/toggleAll`, null, { params: params });
  }
  // 刪除資料
  deleteData(value: ITodo) {
    const params = new HttpParams().set('todoRecordId', value.TodoId);
    return this.http.delete<IApiResultModel>(this.apiUrl, { params: params });
  }
  // 刪除資料(刪除已完成事項)
  clearCompleted(value: string[]) {
    const httpOptions = {
      body: value,
    };
    return this.http.delete<IApiResultModel>(`${this.apiUrl}/clearCompleted`, httpOptions);
  }
}
