import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {DishService} from "./dish.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  name: string = '';
  cuisine: string = 'All';
  type: string = 'All';
  category: string = 'All';
  priceRange: number[] = [];

  updateParams() {
    let params = new HttpParams();
    if (this.name !== '') {
      params = params.set('name', this.name);
    }
    if (this.cuisine !== 'All') {
      params = params.set('cuisine', this.cuisine);
    }
    if (this.type !== 'All') {
      params = params.set('type', this.type);
    }
    if (this.category !== 'All') {
      params = params.set('category', this.category);
    }

    // if (this.priceRange.length > 0) {
    //   this.dishService.updateParams(params, this.priceRange);
    // }
    this.dishService.updateParams(params, this.priceRange);

  }

  setName(name: string) {
    this.name = name;
    this.updateParams();
  }

  setCuisine(cuisine: string) {
    this.cuisine = cuisine;
    this.updateParams();
  }

  setType(type: string) {
    this.type = type;
    this.updateParams();
  }

  setCategory(category: string) {
    this.category = category;
    this.updateParams();
  }

  setPriceRange(range: number[]) {
    this.priceRange = range;
    this.updateParams();
  }

  constructor(private dishService: DishService) {
  }
}
