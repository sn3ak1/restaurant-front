import {Injectable} from '@angular/core';
import {catchError, Observable, ObservedValueOf, of, Subject, switchMap, tap, throwError} from "rxjs";
import {User} from "../data-model/user";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Dish} from "../data-model/dish";
import {Order} from "../data-model/order";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authUrl: string = 'http://localhost:3000/auth';
  private usersUrl: string = 'http://localhost:3000/users';
  cart!: Observable<ObservedValueOf<{ dish: Dish; quantity: number }[]>>;
  watchCart = new Subject<any>();

  user?: User;


  getUser() {
    if (this.getToken() && this.user) {
      return of(this.user);
    }

    return this.http.get<User>(this.usersUrl).pipe(catchError
      ((error: any) => {
        console.log(error);
        return throwError(error);
      }),
      tap((data) => {
        this.user = data;
        console.log("user", this.user);
        // this.watchCart.next(data);
      }));
  }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl + '/all').pipe(catchError
    ((error: any) => {
      console.log(error);
      return throwError(error);
    }));
  }

  hasBoughtDish(dish: Dish) {
    if (!this.getToken()) return of(false);
    console.log("hasBoughtDish");
    return this.getUser().pipe(
      switchMap((user: User) => {

        console.log("user", user);
        return of(user.orders.some(order => {
          console.log("order", order);
          return order.dishes.some(d => {
            console.log("dddddd", d, dish);
            // @ts-ignore
            return d.dish == dish._id
          });
        }));
      }));
  }

  refreshAccessToken() {
    return this.http.post<{ accessToken: string }>(this.authUrl + '/refresh',
      {refreshToken: this.getRefreshToken()}, this.httpOptions).pipe(
      catchError((error: any) => {
        // this.logout();
        return throwError(error);
      },),
      tap((data) => {
        // this.setToken(data.accessToken);
        console.log("data", data);

      })
    );
  }

  checkTokenExpiration(token: string) {
    console.log("checkTokenExpiration");
    if (token) {
      const decodedToken = this.decodeToken(token);
      console.log("decodedToken", decodedToken.exp, Date.now() / 1000);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      }
    }
    return false;
  }


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.cart = this.watchCart.pipe(
      switchMap((user: User) => {
        return user.cart;
      }));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') || null;
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  login(username: string, password: string) {
    const user = {username: username, password: password} as User

    return this.http.post<{ accessToken: string, refreshToken: string }>(this.authUrl + '/login', user, this.httpOptions).pipe(
      catchError((error: any) => {
        console.log(error);
        return of(error.json)
      }),
      tap((data) => {
          console.log(data);
          this.watchCart.next(null)
          this.setToken(data.accessToken);
          this.setRefreshToken(data.refreshToken);
          window.location.reload();
        }
      ));
  }

  restoreCart() {
    return this.getUser().pipe(
      switchMap((user: User) => {
        console.log("user", user);
        return of(user.cart);
      })
    );
  }

  register(username: string, email: string, password: string) {

    const user = {username: username, email: email, password: password} as User

    return this.http.post<any>(this.authUrl + '/register', user, this.httpOptions).pipe(
      catchError((error: any) => {

        if (error.error.message.indexOf("E11000") != -1) {
          error.message = "User already exists";
          console.log('wchodzi');
        }

        console.log(error);
        return throwError(error);
      }),
      tap((data) => {
          this.setToken(data.accessToken);
          this.setRefreshToken(data.refreshToken);
          this.getUser().subscribe();
          window.location.reload();
        }
      ));
  }

  updateUser(user: User) {
    this.user = user;
    console.log("cart ==", user.cart);
    return this.http.put<User>(this.usersUrl + '/' + user._id, {...user})
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return of(error.json)
        }),
      );
  }


  newOrder(order: Order) {
    return this.http.post<any>(this.usersUrl + '/' + 'neworder', {order: order})
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return of(error.json)
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  canModerate() {
    if (!this.getToken()) return of(false);
    return this.getUser().pipe(
      switchMap((user: User) => {
        return of(user.role === 'moderator' || user.role === 'admin');
      }));
  }

  canBuy() {
    if (!this.getToken()) return of(false);
    return this.getUser().pipe(
      switchMap((user: User) => {
        return of(user.role === 'user');
      }));
  }

  getHistory() {
    return this.getUser().pipe(
      switchMap((user: User) => {
        return of(user.orders);
      }));
  }
}

