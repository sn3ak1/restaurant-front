import {Component, OnInit} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {Dish} from "../../data-model/dish";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes() {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
    });
  }
}
