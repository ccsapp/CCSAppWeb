import { Component, Input, OnInit } from '@angular/core';
import { DetailedCar } from 'src/app/_models/fleet-data';

@Component({
  selector: 'app-dynamic-data-card',
  templateUrl: './dynamic-data-card.component.html',
  styleUrls: ['./dynamic-data-card.component.css'],
})
export class DynamicDataCardComponent implements OnInit {
  @Input() car!: DetailedCar;

  locationLink: string = '';

  constructor() {}

  ngOnInit(): void {
    this.locationLink = `https://www.openstreetmap.org/?mlat=${this.car.dynamicData.position.latitude}&mlon=${this.car.dynamicData.position.longitude}`;
  }

  capitilizeWord(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
