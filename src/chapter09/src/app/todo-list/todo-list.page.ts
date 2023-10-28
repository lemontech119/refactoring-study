import { Component, OnInit } from '@angular/core';

type Category = {
  title: string;
  list: any;
  done: number;
  undone: number;
  isClear: boolean;
};
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  public categoryList: Category[] = [
    {
      title: 'Work',
      list: [
        { name: 'development', isDone: false },
        { name: 'development', isDone: false },
        { name: 'development', isDone: false },
      ],
      done: 0,
      undone: 3,
      isClear: false,
    },
    {
      title: 'Study',
      list: [
        { name: 'refactoring', isDone: false },
        { name: 'refactoring', isDone: true },
        { name: 'refactoring', isDone: true },
      ],
      done: 2,
      undone: 1,
      isClear: false,
    },
    {
      title: 'Exercise',
      list: [
        { name: 'cycle', isDone: false },
        { name: 'cycle', isDone: false },
      ],
      done: 0,
      undone: 2,
      isClear: false,
    },
  ];

  public categoryAlertButtons = [
    {
      text: 'OK',
      handler: (text: any) => {
        this.addCategory(text);
      },
    },
    { text: 'CANCEL', role: 'cancel' },
  ];
  public categoryAlertInputs = [
    {
      placeholder: 'Category',
    },
  ];
  public todoAlertButtons = [
    {
      text: 'OK',
      handler: (text: any) => {
        console.log();
        this.addTodo(text);
      },
    },
    { text: 'CANCEL', role: 'cancel' },
  ];
  public todoAlertInputs = [
    {
      placeholder: 'Category',
    },
    {
      placeholder: 'Todo',
    },
  ];
  constructor() {}

  ngOnInit() {}

  addCategory(data: any) {
    console.log(data);
    this.categoryList.push({
      title: data[0],
      list: [],
      done: 0,
      undone: 0,
      isClear: true,
    });
  }

  addTodo(data: any) {
    console.log(data);
    const category = this.categoryList.find(
      (category: Category) => category.title === data[0],
    );
    if (category) {
      category.list.push({ name: data[1], isClear: false });
      category.undone += 1;
      category.isClear = false;
    }
  }

  deleteCategory(event: any, categoryTitle: string) {
    event.preventDefault();
    event.stopPropagation();
    console.log(categoryTitle);
    const deleteIndex = this.categoryList.findIndex(
      (category) => category.title === categoryTitle,
    );
    if (deleteIndex !== -1) {
      this.categoryList.splice(deleteIndex, 1);
    }
  }
  deleteTodo(categoryTitle: string, todoName: any) {
    console.log(categoryTitle, todoName);
    const category = this.categoryList.find(
      (category: Category) => category.title === categoryTitle,
    );
    if (!category) {
      throw new Error('No Exist Category');
    } else {
      const deleteIndex = category.list.findIndex(
        (todo: any) => todo.name === todoName,
      );
      if (deleteIndex !== -1) {
        if (category.list[deleteIndex].isClear) {
          category.done -= 1;
        } else {
          category.undone -= 1;
        }
        category.list.splice(deleteIndex, 1);
      }
      if (category.undone === 0) {
        category.isClear = true;
      }
    }
  }

  checkDone(category: Category) {
    const doneNum = category.list.filter((todo: any) => todo.isDone).length;
    category.isClear = doneNum === category.list.length;
  }
}

// 데이터 구조
// 변수명
// 클래스 추출 등
