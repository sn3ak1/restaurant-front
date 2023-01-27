import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Dish} from "../../data-model/dish";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Dish[] = [];

  ngOnInit(): void {
    this.cartService.getDishes().subscribe(dishes => this.items = dishes);
  }

  constructor(public cartService: CartService) {
  }

  buy() {
    this.cartService.buy();

  }

}
