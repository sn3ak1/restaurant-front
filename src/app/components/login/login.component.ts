import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../data-model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = {username: "", email: "", password: "", role: "", cart: [], orders: [], banned: false};
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  login() {
    this.userService.login(this.user.username, this.user.password).subscribe((data) => {
      console.log(data);
    });
  }

}
