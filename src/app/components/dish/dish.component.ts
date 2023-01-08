import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../data-model/dish";
import {CartService} from "../../services/cart.service";
import {DishService} from "../../services/dish.service";
import {faStar as starFull} from "@fortawesome/free-solid-svg-icons" ;
import {faStar as starEmpty} from "@fortawesome/free-regular-svg-icons" ;
import {faStarHalfStroke as starHalf} from "@fortawesome/free-solid-svg-icons" ;
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";


@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  constructor(public cartService: CartService, public dishService: DishService) {
  }

  @Input() dish!: Dish;

  stars: IconDefinition[] = [];

  ngOnInit(): void {
    this.stars = this.getStars(this.dishService.getAverageRating(this.dish));
  }

  dishCount() {
    return this.cartService.getDishCount(this.dish);
  }

  dishesLeft() {
    return this.dish.quantity - this.cartService.getDishCount(this.dish);
  }


  private getStars(averageRating: number) {
    const stars: IconDefinition[] = [];
    for (let i = 0; i < 5; i++) {
      if (averageRating >= 1) {
        stars.push(starFull);
      } else if (averageRating >= 0.5) {
        stars.push(starHalf);
      } else {
        stars.push(starEmpty);
      }
      averageRating--;
    }
    return stars;
  }
}
