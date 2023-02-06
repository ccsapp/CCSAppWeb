import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/_models/fleet-data';

@Component({
  selector: 'app-car-overview-card',
  templateUrl: './car-overview-card.component.html',
  styleUrls: ['./car-overview-card.component.css'],
})
export class CarOverviewCardComponent implements OnInit {
  @Input() car!: Car;

  path: string = '';

  static paths: { [brand: string]: string } = {
    'Audi': '/assets/brands/audi.svg',
    'Mercedes-Benz': '/assets/brands/mercedes.svg',
  };

  constructor() {}

  ngOnInit(): void {
    this.path = this.getIconPath();
  }

  getIconPath(): string {
    return CarOverviewCardComponent.paths[this.car.brand];
  }
}
