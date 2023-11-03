import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  addUser(id: number, name: string): void {
    const newUser = new User(id, name);
    this.users.push(newUser);
  }

  findUserById(id: number ): User | string {
    const foundUser = this.users.find(user => user.id === id);
    if (foundUser) {
      return foundUser;
    } else {
      return 'User not found';  // 오류 코드 반환
    }
  }
}
