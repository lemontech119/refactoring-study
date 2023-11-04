import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  createUser(id: number, name: string): User {
    return new User(id, name);
  }

  addUser(id: number, name: string): void {
    try {
      this.users.push(this.createUser(+id, name));
    } catch (e) {
      throw new Error('addUser() Error');
    }
  }

  findUserById(id: number ): User {
    const user = this.users.find(user => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Error('findUserById() Error');
    }
  }
}
