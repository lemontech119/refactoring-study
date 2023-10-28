import { Component, OnInit } from '@angular/core';
import { Category, CategoryInfo, TodoInfo, Todo } from './todo';
import { serverData } from './serverData';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  public serverData = serverData;

  public categoryList: Category[] = [];

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

  ngOnInit() {
    this.setList();
  }

  addCategory(data: any) {
    console.log(data);
    this.categoryList.push( new Category(data[0]));
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

  addTodo(data: {[key:number]:string}) {
    console.log(data);
    const category = this.categoryList.find(
      (category: Category) => category.title === data[0],
    );
    category?.add({ name: data[1], isDone: false });
  }

  deleteTodo(categoryTitle: string, todoName: string) {
    console.log(categoryTitle, todoName);
    const category = this.categoryList.find(
      (category: Category) => category.title === categoryTitle,
    );
    if (!category) {
      throw new Error('No Exist Category');
    } else {
      category.remove(todoName);
    }
  }

  setList() {
    for (const data of this.serverData) {
      this.categoryList.push(new Category(data.title))
    }

    for (const data of this.serverData) {
      const category = this.categoryList.find(
        (category: Category) => category.title === data.title,
      );
      if (category) {
        for (const todo of data.list) {
          category.add(new Todo(todo));
        }
      }
    }
  }
}

// 데이터 구조
// 변수명
// 클래스 추출 등
