import { Component } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: User | null = null;
  errorMessage: string = '';
  userForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService) {
  }

  onFindUser(userId: number): void {
    try {
      const result = this.userService.findUserById(userId);
      if (result instanceof User)
        this.user = result;
    } catch (e: any) {
      this.errorMessage = e.message;
    }

  }

  onSubmit(): void {
    try {
      if (this.userForm.valid) {
        const { id, name } = this.userForm.value;
        if (!(typeof id === 'number')) {
          throw new Error('Id is number');
        }
        if (typeof name === 'string') {
          this.userService.addUser(+id, name);
          this.userForm.reset();
        } else {
          throw new Error('Invalid Name');
        }
      }
    } catch (e:any) {
      this.errorMessage = e.message;
    }
  }


}
