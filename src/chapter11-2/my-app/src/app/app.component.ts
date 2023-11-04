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
    id: new FormControl('',[Validators.required]),
    name: new FormControl('', [Validators.required])
  });
  constructor(private userService: UserService) {}

  onFindUser(userId: number): void {
    const result = this.userService.findUserById(userId);
    if (typeof result === 'string') {
      this.errorMessage = result;
    } else {
      this.user = result;
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
