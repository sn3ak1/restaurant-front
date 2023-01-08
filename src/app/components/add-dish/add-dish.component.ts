import {Component, OnInit} from '@angular/core';
import {Dish, DishCategory, DishCuisine, DishType} from "../../data-model/dish";
import {DishService} from "../../services/dish.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

  constructor(private dishService: DishService, private location: Location) {
  }

  dishTypes: string[] = []
  dishCategories: string[] = []
  dishCuisines: string[] = []

  ingredients: string = '';

  dish: Dish = {
    _id: '',
    category: DishCategory.Other,
    cuisine: DishCuisine.Other,
    description: "",
    images: [],
    ingredients: [],
    name: "",
    price: 0,
    quantity: 0,
    type: DishType.Other
  };

  ngOnInit() {
    this.dishCategories = Object.values(DishCategory);
    this.dishCuisines = Object.values(DishCuisine);
    this.dishTypes = Object.values(DishType);
  }

  addDish() {
    this.dish.ingredients = this.ingredients.split(';');
    this.dishService.addDish(this.dish).subscribe();
    this.location.back();
  }
}
