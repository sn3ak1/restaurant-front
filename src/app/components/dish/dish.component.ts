import {Component, Input} from '@angular/core';
import {Dish} from "../../data-model/dish";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {
  @Input() dish!: Dish;

  addToCart(dish: Dish) {

  }

  increaseQuantity(dish: Dish) {

  }

  decreaseQuantity(dish: Dish) {

  }

  removeFromCart(dish: Dish) {

  }
}
