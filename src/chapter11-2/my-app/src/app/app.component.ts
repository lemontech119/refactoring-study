import { Component } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: User = new User(-1,'unknown');
  errorMessage: string = '';
  userForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('', [Validators.required])
  });
  constructor(private userService: UserService) {}

  onFindUser(userId: number): void {
    try {
      const result = this.userService.findUserById(userId);
      this.user = result;
    } catch (e:any) {
      this.errorMessage = e.message;
      throw new Error('onFindUser() Error');
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { id, name } = this.userForm.value;
      //@ts-ignore
      this.userService.addUser(id, name);
      this.userForm.reset();
    }
  }
}
