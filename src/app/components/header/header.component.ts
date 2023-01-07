import {Component} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public cartService: CartService) {
  }

  // TODO
  // Wyświetl również sumaryczną ilość aktualnie zarezerwowanych dań - jeśli wynosi on więcej
  // niż 10 ma być wyświetlana na niebieskim tle, jeśli poniżej 10 na pomarańczowym tle.
}
