import {Component, OnInit} from '@angular/core';
import {DishCategory, DishCuisine, DishType} from "../../data-model/dish";
import {SearchService} from "../../services/search.service";
import {DishService} from "../../services/dish.service";

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
  cuisine: DishCuisine | string = 'All';
  category: DishCategory | string = 'All';

  minPrice = 0;
  maxPrice = 100;

  constructor(public searchService: SearchService, private dishService: DishService) {
  }


  ngOnInit(): void {
    this.dishCategories = Object.values(DishCategory);
    this.dishCuisines = Object.values(DishCuisine);
    this.dishTypes = Object.values(DishType);

    this.dishService.getDishes().subscribe(_ => {
      this.minPrice = this.dishService.minPrice;
      this.maxPrice = this.dishService.maxPrice;
    });
  }

  search(value: string) {
    this.searchService.setName(value);
  }
}
