import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {Dish} from "../../data-model/dish";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  dishes$!: Observable<Dish[]>;
  private searchTerms = new Subject<string>();

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.dishes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dishService.searchDishes(term))
    );

    setTimeout(() => this.search(''), 0);
  }

  search(value: string) {
    this.searchTerms.next(value);
  }
}
