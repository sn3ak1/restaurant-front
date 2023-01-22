import {Injectable, OnInit} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, tap} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Dish} from "../data-model/dish";
import {Comment} from "../data-model/comment";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = "http://localhost:3000/dishes";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  dishes$!: Observable<Dish[]>;
  watchDishes = new Subject<any>();

  minPrice = 0;
  maxPrice = 100;

  priceRange: number[] = [0, 0];


  constructor(private http: HttpClient) {
    this.dishes$ = this.watchDishes
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((obj) => {
          return this.http.get<Dish[]>(this.dishesUrl, {...this.httpOptions, params: obj?.query}).pipe(
            tap(dishes => {
              this.maxPrice = Math.max(...dishes.map(d => d.price));
              this.minPrice = Math.min(...dishes.map(d => d.price));

            }),
            switchMap(dishes => {
                if (obj?.priceRange.length > 0) {
                  return of(dishes.filter(d => d.price >= this.priceRange[0] && d.price <= this.priceRange[1]));
                }
                return of(dishes);
              }
            ))
        }));


    setTimeout(() => this.watchDishes.next(null), 0);
  }


  updateParams(params: HttpParams, priceRange: number[] = []) {
    this.priceRange = priceRange;
    this.watchDishes.next({query: params, priceRange: priceRange});
  }

  isCheapest(dish: Dish) {
    return dish.price === this.minPrice;
  }

  isMostExpensive(dish: Dish) {
    return dish.price === this.maxPrice;
  }

  getAverageRating(dish: Dish) {
    if (dish.comments) {
      return dish.comments.map(c => c.rating).reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0) / dish.comments.length;
    } else {
      return 0;
    }
  }

  removeDish(dish: Dish) {
    return this.http.delete(this.dishesUrl + "/" + dish._id).pipe(
      catchError((error: any) => {
        console.log(error);
        return of(error.json())
      }),
      tap(_ => this.watchDishes.next(null))
    );
  }

  addDish(dish: Dish) {
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions).pipe(
      catchError((error: any) => {
        console.log(error);
        return of(error.json())
      }),
      tap(_ => this.watchDishes.next(null))
    );
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes$;
  }

  getOneDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(this.dishesUrl + "/" + id);
  }

  addReview(id: string, comment: Comment) {
    return this.http.put(this.dishesUrl + "/" + id, {comment: Comment}, this.httpOptions).pipe(
      catchError((error: any) => {
        console.log(error);
        return of(error.json())
      }),
      tap(_ => this.watchDishes.next(null))
    );
  }
}
