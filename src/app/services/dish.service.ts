import {Injectable} from '@angular/core';
import {Dish} from "../data-model/dish";
import {catchError, Observable, of, tap} from "rxjs";
// import {DISHES} from "../mock-dishes";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor(private http: HttpClient) {
  }

  private dishesUrl = "http://localhost:3000/dishes";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private cheapestPrice: number = 0;
  private mostExpensivePrice: number = 0;

  // populateDatabase() {
  //   DISHES.forEach(dish => this.addDish(dish).subscribe());
  // }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl).pipe(
      tap(dishes => {
        this.cheapestPrice = Math.min(...dishes.map(d => d.price));
        this.mostExpensivePrice = Math.max(...dishes.map(d => d.price));
      }),
      catchError(this.handleError<Dish[]>('getDishes', []))
    );
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(this.dishesUrl + "/" + id).pipe(
      catchError(this.handleError<Dish>('getDish'))
    );
  }

  addDish(dish: Dish) {
    return this.http.post<Dish>(this.dishesUrl, dish, this.httpOptions).pipe(
      catchError(this.handleError<Dish>('addDish'))
    );
  }

  isCheapest(dish: Dish) {
    return dish.price === this.cheapestPrice;
  }

  isMostExpensive(dish: Dish) {
    return dish.price === this.mostExpensivePrice;
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
