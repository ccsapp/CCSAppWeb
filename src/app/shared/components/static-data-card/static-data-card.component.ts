import { Component, Input, OnInit } from '@angular/core';
import { capitalizeWord } from 'src/app/util';
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
    this.splitFuelCapacity();
  }

  splitFuelCapacity() {
    const capcaities = this.car.technicalSpecification.fuelCapacity.split(';');
    if (capcaities.length === 2) {
      this.fuelCapacityGasoline = capcaities[0].replace('L', '');
      this.fuelCapacityElectric = capcaities[1].replace('kWh', '');
      return;
    }
    if (capcaities[0].includes('L')) {
      this.fuelCapacityGasoline = capcaities[0].replace('L', '');
      return;
    }
    if (capcaities[0].includes('kWh')) {
      this.fuelCapacityElectric = capcaities[0].replace('kWh', '');
      return;
    }
  }

  capitalizeWord(word: string) {
    return capitalizeWord(word);
  }
}
