export type CategoryInfo = {
  title: string;
  list: Todo[];
  done: number;
  undone: number;
};

export type TodoInfo = {
  name:string;
  isDone:boolean;
};

export class Category {
  private _title: string;
  private _list: Todo[];
  private _done: number;
  private _undone: number;

  constructor(title:string) {
    this._title = title;
    this._list = [];
    this._done = 0;
    this._undone = 0
  }

  get title() {
    return this._title
  }

  set title(title) {
    this._title = title
  }

  get list() {
    return this._list
  }

  get done() {
    return this._list.filter((todo)=>todo.isDone).length
  }

  get undone() {
    return this._list.filter((todo)=>!todo.isDone).length
  }

  get total() {return this.done+this.undone}
  get isClear() {return this.undone===0}

  add(todo:TodoInfo) {
    this._list.push(new Todo(todo));
    if (todo.isDone) {
      this._done += 1;
    } else {
      this._undone += 1;
    }
  }

  remove(todoName:string) {
    const deleteIndex = this.list.findIndex(
      (todo: any) => todo.name === todoName,
    );

    if (deleteIndex !== -1) {
      const deletedTodo = this.list.splice(deleteIndex, 1)[0]
      if (deletedTodo.isDone) {
        this._done -= 1;
      } else {
        this._undone -= 1;
      };
    }
  }
}

export class Todo {
  private _name: string;
  private _isDone: boolean;

  constructor(data:TodoInfo) {
    this._name = data.name;
    this._isDone = data.isDone;
  }
  get name() {return this._name}
  set name(name) {this._name = name}

  get isDone() {return this._isDone}
  set isDone(isDone) {this._isDone = isDone}
}
