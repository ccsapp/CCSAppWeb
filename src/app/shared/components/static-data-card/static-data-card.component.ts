import { Component, Input, OnInit } from '@angular/core';
import { capitalizeWord, splitFuelCapacity } from 'src/app/util';
import { DetailedCar } from 'src/app/_models/fleet-data';

@Component({
  selector: 'app-static-data-card',
  templateUrl: './static-data-card.component.html',
  styleUrls: ['./static-data-card.component.css'],
})
export class StaticDataCardComponent implements OnInit {
  @Input() car!: DetailedCar;

  fuelCapacityGasoline: string = '';
  fuelCapacityElectric: string = '';

  constructor() {}

  ngOnInit(): void {
    ({
      fuelCapacityGasoline: this.fuelCapacityGasoline,
      fuelCapacityElectric: this.fuelCapacityElectric,
    } = splitFuelCapacity(this.car.technicalSpecification.fuelCapacity));
  }

  capitalizeWord(word: string) {
    return capitalizeWord(word);
  }
}
