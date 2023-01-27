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

  constructor(private dishService: DishService) {
  }

  dishes!: Dish[];

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
    setTimeout(() => this.dishService.watchDishes.next(null), 0);
  }
}
