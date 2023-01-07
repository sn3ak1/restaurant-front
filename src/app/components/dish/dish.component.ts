import {Component, Input} from '@angular/core';
import {Dish} from "../../data-model/dish";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {

  constructor(public cartService: CartService) {
  }

  @Input() dish!: Dish;


  dishCount() {
    return this.cartService.getDishCount(this.dish);
  }

  dishesLeft() {
    return this.dish.quantity - this.cartService.getDishCount(this.dish);
  }

  addToCart(dish: Dish) {

  }

  increaseQuantity(dish: Dish) {
    this.cartService.addDish(dish);
  }

  decreaseQuantity(dish: Dish) {

  }

  removeFromCart(dish: Dish) {

  }
}
