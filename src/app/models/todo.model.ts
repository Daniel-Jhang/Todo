export interface ITodo {
  Status: boolean;
  Context: string;
}

export class Todo {
  Status: boolean;
  Context: string;

  constructor(_ststus: boolean = false, _context: string) {
    this.Status = _ststus;
    this.Context = _context;
  }
}
