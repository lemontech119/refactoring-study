import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  // 2. 생성자를 사용하여 직접 객체 생성 (리팩토링 대상)
  addUser(id: number, name: string): void {
    const newUser = new User(id, name);
    this.users.push(newUser);
  }

  // 6. 오류 코드 반환 (리팩토링 대상)
  findUserById(id: number ): User | string {
    const foundUser = this.users.find(user => user.id === id);
    if (foundUser) {
      return foundUser;
    } else {
      return 'User not found';  // 오류 코드 반환
    }
  }
}
