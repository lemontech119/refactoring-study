export class Category {
  private _title: string;
  private _list: SubTask[];
  private _done: number;
  private _undone: number;
  private _isClear: boolean;

  constructor(
    title: string,
    list: SubTask[],
    done: number,
    undone: number,
    isClear: boolean
  ) {
    this._title = title;
    this._list = list;
    this._done = done;
    this._undone = undone;
    this._isClear = isClear;
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get list(): SubTask[] {
    return this._list;
  }

  set list(list: SubTask[]) {
    this._list = list;
  }

  get done(): number {
    return this._done;
  }

  set done(done: number) {
    this._done = done;
  }

  get undone(): number {
    return this._undone;
  }

  set undone(undone: number) {
    this._undone = undone;
  }

  get isClear(): boolean {
    return this._isClear;
  }

  set isClear(isClear: boolean) {
    this._isClear = isClear;
  }
}

export class SubTask {
  private _name: string;
  private _isDone: boolean;
  private _isClear: boolean;

  constructor(name: string, isDone: boolean = false, isClear: boolean = false) {
    this._name = name;
    this._isDone = false;
    this._isClear = false;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get isDone(): boolean {
    return this._isDone;
  }

  set isDone(isDone: boolean) {
    this._isDone = isDone;
  }

  get isClear(): boolean {
    return this._isClear;
  }

  set isClear(isClear: boolean) {
    this._isClear = isClear;
  }
}
