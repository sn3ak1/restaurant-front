import {Component} from '@angular/core';
import {Order} from "../../data-model/order";
import {UserService} from "../../services/user.service";
import {DishService} from "../../services/dish.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  username = '';
  history?: Order[] = [];

  constructor(public userService: UserService, public dishService: DishService) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.username = user.username;
      this.history = user.orders;
    })
  }

  getDate(date: Date) {
    return new Date(date).toLocaleString();
  }
}
