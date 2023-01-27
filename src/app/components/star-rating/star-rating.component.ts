import {Component, Input, OnInit} from '@angular/core';
import {faStar as starFull, faStarHalfStroke as starHalf} from "@fortawesome/free-solid-svg-icons" ;
import {faStar as starEmpty} from "@fortawesome/free-regular-svg-icons" ;
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() selectedStars = 0;
  @Input() clickable = false;
  stars: IconDefinition[] = [];

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    if (!this.clickable) {
      for (let i = 0; i < 5; i++) {
        if (this.selectedStars >= 1) {
          this.stars.push(starFull);
        } else if (this.selectedStars >= 0.5) {
          this.stars.push(starHalf);
        } else {
          this.stars.push(starEmpty);
        }
        this.selectedStars--;
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (i < this.selectedStars) {
          this.stars.push(starFull);
        } else {
          this.stars.push(starEmpty);
        }
      }
    }
  }

  clicked(index: number) {
    if (this.clickable) {
      this.stars.forEach((star, i) => this.stars[i] = i <= index ? starFull : starEmpty)
    }

    this.searchService.setRating(index + 1);

  }
}
