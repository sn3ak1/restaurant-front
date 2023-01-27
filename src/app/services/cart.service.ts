import {Injectable} from '@angular/core';
import {Dish} from "../data-model/dish";
import {debounceTime, distinctUntilChanged, of, switchMap, tap} from "rxjs";
import {UserService} from "./user.service";
import {User} from '../data-model/user';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private userService: UserService) {
  }

  dishes = new Map<Dish, number>();

  addDish(dish: Dish) {
    this.dishes.set(dish, this.getDishCount(dish) + 1);

    this.userService.getUser().subscribe((user: User) => {
      user.cart = [...this.dishes].map(([dish, quantity]) => ({dish: dish, quantity: quantity}));
      this.userService.updateUser(user).subscribe();
    })
  }

  removeDish(dish: Dish) {
    this.dishes.set(dish, this.getDishCount(dish) - 1);
  }

  getDishCount(dish: Dish) {
    return this.dishes.get(dish) ?? 0;
  }

  getNumberOfDishesInCart() {
    return this.dishes.size;
  }

  getTotalPrice() {
    let sum = 0;
    this.dishes.forEach((value, key) => sum += value * key.price);
    return sum;
  }

  getTotalPriceForDish(dish: Dish) {
    return this.getDishCount(dish) * dish.price;
  }

  getDishes() {
    return of(Array.from(this.dishes.keys()));
  }

  getAllDishCount() {
    let sum = 0;
    this.dishes.forEach((value, key) => sum += value);
    return sum;
  }

  buy() {

    this.userService.getUser().subscribe((user: User) => {
      user.orders.push({dishes: user.cart, date: new Date(), total: this.getTotalPrice()});

      this.userService
        .newOrder({dishes: user.cart, date: new Date(), total: this.getTotalPrice()}).subscribe();
      this.dishes.clear();

      this.userService.getUser().subscribe((user: User) => {
        user.cart = [];
        this.userService.updateUser(user).subscribe();
      })
    })
  }

}
