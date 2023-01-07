import {Injectable} from '@angular/core';
import {Dish} from "../data-model/dish";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dishes: Dish[] = [];

  addDish(dish: Dish) {
    this.dishes.push(dish);
  }

  removeDish(dish: Dish) {
    const index = this.dishes.indexOf(dish);
    if (index > -1) {
      this.dishes.splice(index, 1);
    }
  }

  getDishes() {
    return this.dishes;
  }

  getTotalPrice() {
    return this.dishes.reduce((acc, dish) => acc + dish.price, 0);
  }

  clearCart() {
    this.dishes = [];
  }

  getAllDishCount() {
    return this.dishes.length;
  }

  getDishCount(dish: Dish) {
    return this.dishes.filter(d => d.id === dish.id).length;
  }

  constructor() {
  }
}
