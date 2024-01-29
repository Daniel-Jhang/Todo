// 註: 在TypeScript最後打包產生可執行檔時，Interface並不會被一起打包，它只存在在開發時(RunTime)，協助我們定義型別，方便coding(點的出東西來)
// 而Class則會被TypeScrip轉換成對應的JavaScript程式碼，並打包進可執行檔
// 如果只是單純的數據流(只是要承接資料而已)，可以簡單用Interface，但如果要實做某些方法則要使用Class

export interface ITodo {
  TodoId: string;
  Status: boolean;
  Context: string;
  Editing: boolean;
}

export class Todo implements ITodo {
  TodoId: string;
  Status: boolean;
  Context: string;
  Editing: boolean;

  constructor() {
    this.TodoId = '';
    this.Status = false;
    this.Context = '';
    this.Editing = false;
  }

  toggle() {
    this.Status = !this.Status;
  }
}

export enum TodoStatusType {
  All,
  Active,
  Completed,
}
