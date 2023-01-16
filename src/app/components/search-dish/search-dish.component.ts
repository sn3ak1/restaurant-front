import {Component, OnInit} from '@angular/core';
import {DishCategory, DishCuisine, DishType} from "../../data-model/dish";

@Component({
  selector: 'app-search-dish',
  templateUrl: './search-dish.component.html',
  styleUrls: ['./search-dish.component.scss']
})
export class SearchDishComponent implements OnInit {

  dishTypes: string[] = []
  dishCategories: string[] = []
  dishCuisines: string[] = []

  type: DishType | string = 'All';
  cuisine?: DishCuisine | string = 'All';
  category?: DishCategory | string = 'All';

  ngOnInit(): void {
    this.dishCategories = Object.values(DishCategory);
    this.dishCuisines = Object.values(DishCuisine);
    this.dishTypes = Object.values(DishType);
  }

  search(value: string) {

  }
}
