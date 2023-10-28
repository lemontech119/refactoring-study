import { Component, OnInit } from '@angular/core';
import { AlertButton } from '@ionic/angular';

export interface ICategory {
  title: string;
  list: Todo[];
  done: number;
  undone: number;
  isClear: boolean;
}

class Category {
  private _title: string;
  private _list: Todo[];
  private _done: number;
  private _undone: number;
  private _isClear: boolean;

  constructor(data: ICategory) {
    this._title = data.title;
    this._list = data.list;
    this._done = data.done;
    this._undone = data.undone;
    this._isClear = data.isClear;
  }

  get title() {
    return this._title;
  }

  get list() {
    return this._list;
  }

  set list(value) {
    this._list = value;
  }

  get done() {
    return this._done;
  }

  set done(value: number) {
    this._done = value;
  }

  get undone() {
    return this._undone;
  }

  set undone(value: number) {
    this._undone = value;
  }

  get isClear() {
    return this._isClear;
  }

  set isClear(value: boolean) {
    this._isClear = value;
  }

  checkDone() {
    this.isClear = this.list.filter((todo: any) => todo.isDone).length === this.list.length;
  }

  addTodo(data: Todo) {
    this._list.push(data);
    this.undone += 1;
    this.isClear = false;
  }

  deleteTodo(todoName: string) {
    this.list = this.list.filter((todo: Todo) => {
        if (todo.name === todoName) {
          if (todo.isDone) {
            this.done -= 1;
          } else {
            this.undone -= 1;
          }
          return false;
        } else {
          return true;
        }
      }
    );
    if (this.undone === 0) {
      this.isClear = true;
    }
  }

}

interface ITodo {
  name: string;
  isDone: boolean;
}

class Todo {
  private _name: string;
  private _isDone: boolean;

  constructor(data: ITodo) {
    this._name = data.name;
    this._isDone = data.isDone;
  }

  get name() {
    return this._name;
  }

  get isDone() {
    return this._isDone;
  }

  set isDone(value: boolean) {
    this._isDone = value;
  }
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss']
})
export class TodoListPage implements OnInit {
  public categoryList: Category[] = [
    new Category({
      title: 'Work',
      list: [
        new Todo({ name: 'development', isDone: false }),
        new Todo({ name: 'development', isDone: false }),
        new Todo({ name: 'development', isDone: false })
      ],
      done: 0,
      undone: 3,
      isClear: false
    })
  ];

  public categoryAlertButtons: AlertButton[] = [
    {
      text: 'OK',
      handler: (text: any) => {
        debugger;
        this.addCategory(text);
      }
    },
    { text: 'CANCEL', role: 'cancel' }
  ];
  public categoryAlertInputs = [
    {
      placeholder: 'Category'
    }
  ];
  public todoAlertButtons = [
    {
      text: 'OK',
      handler: (text: any) => {
        console.log();
        this.addTodo(text);
      }
    },
    { text: 'CANCEL', role: 'cancel' }
  ];
  public todoAlertInputs = [
    {
      placeholder: 'Category'
    },
    {
      placeholder: 'Todo'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  addCategory(data: any) {
    this.categoryList.push(new Category({
      title: data[0],
      list: [],
      done: 0,
      undone: 0,
      isClear: true
    }));
  }

  deleteCategory(event: any, categoryTitle: string) {
    event.preventDefault();
    event.stopPropagation();
    const deleteIndex = this.categoryList.findIndex(
      (category) => category.title === categoryTitle
    );
    if (deleteIndex !== -1) {
      this.categoryList.splice(deleteIndex, 1);
    }
  }

  addTodo(data: any) {
    this.categoryList.find((category: Category) => category.title === data[0])?.addTodo(new Todo({
      name: data[1],
      isDone: false
    }));
  }

  deleteTodo(categoryTitle: string, todoName: any) {
    this.categoryList.find((category: Category) => category.title === categoryTitle)?.deleteTodo(todoName);
  }

  checkDone(category: Category) {
    category.checkDone();
  }
}