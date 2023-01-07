import {Comment} from "./comment";


export enum DishType {
  Vegan = 'Vegan',
  Vegetarian = 'Vegetarian',
  Meat = 'Meat',
  Fish = 'Fish',
  Other = 'Other'
}

export enum DishCategory {
  Appetizer = 'Appetizer',
  Main = 'Main',
  Dessert = 'Dessert',
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Soup = 'Soup',
  Salad = 'Salad',
  Supper = 'Supper',
  Side = 'Side',
  Other = 'Other',
}

export enum DishCuisine {
  Indian = 'Indian',
  Italian = 'Italian',
  American = 'American',
  Japanese = 'Japanese',
  Mexican = 'Mexican',
  Other = 'Other',

}

export interface Dish {
  id: number;
  name: string;
  images: string[];
  cuisine: DishCuisine;
  category: DishCategory;
  type: DishType;
  price: number;
  description: string;
  quantity: number;
  comments?: Comment[];
  ingredients: string[];
}
