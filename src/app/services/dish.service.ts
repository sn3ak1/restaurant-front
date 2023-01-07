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

  constructor() {
  }
}
