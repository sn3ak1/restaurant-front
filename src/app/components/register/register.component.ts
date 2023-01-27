import {Component} from '@angular/core';
import {User} from "../../data-model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User = {cart: [], orders: [], username: "", email: "", password: "", role: "", banned: false};
  userService: UserService;
  error?: string;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register() {
    console.log(this.user);
    this.userService.register(this.user.username, this.user.email, this.user.password).subscribe(
      (data) => {
        console.log('test', data);
      },
      (error) => {
        console.log(error);
        this.error = error.message;
      }
    );
  }

}
