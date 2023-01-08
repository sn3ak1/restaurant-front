import {Injectable} from '@angular/core';
import {Dish} from "../data-model/dish";
import {catchError, Observable, of, tap} from "rxjs";
// import {DISHES} from "../mock-dishes";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DISHES} from "../mock-dishes";

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

  populateDatabase() {
    DISHES.forEach(dish => this.addDish(dish).subscribe());
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl).pipe(
      tap(dishes => {
        this.cheapestPrice = Math.min(...dishes.map(d => d.price));
        this.mostExpensivePrice = Math.max(...dishes.map(d => d.price));
      }),
      catchError(this.handleError<Dish[]>('getDishes', []))
    );
  }

  searchDishes(term: string): Observable<Dish[]> {
    console.log("searchDishes: " + term);
    if (!term.trim()) {
      return this.getDishes();
    }
    return this.http.get<Dish[]>(`${this.dishesUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Dish[]>('searchDishes', []))
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

  addComment(dish: Dish, rating: number, comment: string) {
    if (!dish.comments) {
      dish.comments = [];
    }

    dish.comments.push({
      _id: this.mongoObjectId(),
      rating: rating,
      comment: comment
    });
    return this.updateDish(dish);
  }

  updateDish(dish: Dish) {
    return this.http.patch(this.dishesUrl + "/" + dish._id, dish, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateDish'))
    );
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


  private mongoObjectId() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  };

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
