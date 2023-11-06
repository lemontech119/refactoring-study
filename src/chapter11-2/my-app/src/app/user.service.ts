import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  addUser(id: number, name: string): void {
    const newUser = this.newUser(id, name);
    this.users.push(newUser);
    this.users.map()
  }

  newUser(id: number, name: string) {
    return new User(id, name);
  }

  findUserById(id: number): User{
    const foundUser = this.users.find(user => user.id === id);
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }
}
