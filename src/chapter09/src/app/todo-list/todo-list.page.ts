import { Component, OnInit } from '@angular/core';
import { Category, SubTask } from '../common/class';
import { IAddTodo, IAddCategory } from '../common/interface';

class Todo {
  private categoryList: Category[] = [];

  defaultSettingCategoryList(): void {
    this.categoryList = [
      new Category(
        'Work',
        [
          new SubTask('development'),
          new SubTask('development'),
          new SubTask('development'),
        ],
        0,
        3,
        false
      ),
      new Category(
        'Study',
        [
          new SubTask('refactoring'),
          new SubTask('refactoring', true),
          new SubTask('refactoring', true),
        ],
        2,
        1,
        false
      ),
      new Category(
        'Exercise',
        [new SubTask('cycle'), new SubTask('cycle')],
        0,
        2,
        false
      ),
    ];
  }

  getCategories(): Category[] {
    return this.categoryList;
  }

  addCategory(title: string): void {
    this.categoryList.push(new Category(title, [], 0, 0, false));
  }

  getCategoryByTitle(title: string): Category | undefined {
    return this.categoryList.find(
      (category: Category) => category.title === title
    );
  }

  getCategoryIdxByTitle(title: string): number {
    return this.categoryList.findIndex(
      (category: Category) => category.title === title
    );
  }

  addSubTask(title: string, subTaskName: string): void {
    const category = this.getCategoryByTitle(title);
    if (category) {
      category.list.push(new SubTask(subTaskName));
      category.undone += 1;
    }
  }

  deleteCategory(event: any, title: string): void {
    event.preventDefault();
    event.stopPropagation();
    const index = this.getCategoryIdxByTitle(title);
    if (index !== -1) {
      this.categoryList.splice(index, 1);
    }
  }

  deleteSubTask(title: string, subTaskName: string): void {
    const category = this.getCategoryByTitle(title);
    if (!category) {
      throw new Error('No Exist Category');
    }
    const deleteIndex = category.list.findIndex(
      (subTask: SubTask) => subTask.name === subTaskName
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

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  public todo: Todo = new Todo();
  public categoryList: Category[] = [];

  ngOnInit(): void {
    this.todo.defaultSettingCategoryList();
    this.categoryList = this.todo.getCategories();
  }

  public categoryAlertButtons = [
    {
      text: 'OK',
      handler: (text: IAddCategory) => {
        this.todo.addCategory(text[0]);
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
      handler: (text: IAddTodo) => {
        this.todo.addSubTask(text[0], text[1]);
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

  checkDone(category: Category) {
    const doneNum = category.list.filter((todo: SubTask) => todo.isDone).length;
    category.isClear = doneNum === category.list.length;
  }
}
