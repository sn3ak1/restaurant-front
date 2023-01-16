import {Component, Input, OnInit} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent implements OnInit {

  @Input() minValue = 0;
  @Input() maxValue = 100;
  options!: Options;

  ngOnInit(): void {
    this.options = {
      floor: this.minValue,
      ceil: this.maxValue
    };
  }
}
