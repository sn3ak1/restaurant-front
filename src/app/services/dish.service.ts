import {Injectable} from '@angular/core';
import {Dish} from "../data-model/dish";
import {Observable, of} from "rxjs";
import {DISHES} from "../mock-dishes";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Observable<Dish[]> {
    return of(DISHES);
  }

  isCheapest(dish: Dish) {
    return dish.price === Math.min(...DISHES.map(d => d.price));
  }

  isMostExpensive(dish: Dish) {
    return dish.price === Math.max(...DISHES.map(d => d.price));
  }

  addDish(dish: Dish) {
    dish.id = this.getId();
    DISHES.push(dish);
  }

  getId(): number {
    return DISHES.length + 1;
  }
}
