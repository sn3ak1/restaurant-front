import {Component, Input} from '@angular/core';
import {Dish} from "../../data-model/dish";
import {CartService} from "../../services/cart.service";
import {DishService} from "../../services/dish.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {

  constructor(public cartService: CartService, public dishService: DishService) {
  }

  @Input() dish!: Dish;


  dishCount() {
    return this.cartService.getDishCount(this.dish);
  }

  dishesLeft() {
    return this.dish.quantity - this.cartService.getDishCount(this.dish);
  }
}
