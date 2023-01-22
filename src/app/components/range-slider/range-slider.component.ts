import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';
import {SearchService} from "../../services/search.service";
import {DishService} from "../../services/dish.service";

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent implements OnChanges {
  @Input() floor = 0;
  @Input() ceil = 100;
  minValue!: number;
  maxValue!: number;

  constructor(public searchService: SearchService) {
  }

  onChange() {
    this.searchService.setPriceRange([this.minValue, this.maxValue]);
  }

  ngOnChanges(): void {
    console.log(this.floor, this.ceil);

    if (this.floor !== undefined && isFinite(this.floor)) {
      this.minValue = this.floor;
    } else {
      this.minValue = 0;
      this.floor = 0;
    }
    if (this.ceil !== undefined && isFinite(this.ceil)) {
      this.maxValue = this.ceil;
    } else {
      this.maxValue = 1;
      this.ceil = 1;
    }
  }
}
