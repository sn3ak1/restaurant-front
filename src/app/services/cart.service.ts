import {Injectable} from '@angular/core';
import {Dish} from "../data-model/dish";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Map<Dish, number> = new Map<Dish, number>();

  addDish(dish: Dish) {
    this.cart.set(dish, this.getDishCount(dish) + 1);
  }

  removeDish(dish: Dish) {
    this.cart.set(dish, this.getDishCount(dish) - 1);
  }

  getDishes() {
    return this.cart;
  }

  getTotalPrice() {
    return [...this.cart.keys()].reduce((total: number, dish: Dish) => total + dish.price * this.getDishCount(dish), 0);
  }

  clearCart() {
    this.cart.clear();
  }

  getAllDishCount() {
    return [...this.cart.values()].reduce((total: number, count: number) => total + count, 0);
  }

  getDishCount(dish: Dish) {
    return this.cart.get(dish) || 0;
  }

  constructor() {
  }
}
