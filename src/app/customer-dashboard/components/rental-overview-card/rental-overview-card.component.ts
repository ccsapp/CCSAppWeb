import { Component, Input, OnInit } from '@angular/core';
import { Rental } from 'src/app/_models/rental-data';
import logoPaths from 'src/assets/brands/brands.json';

@Component({
  selector: 'app-rental-overview-card',
  templateUrl: './rental-overview-card.component.html',
  styleUrls: ['./rental-overview-card.component.css'],
})
export class RentalOverviewCardComponent implements OnInit {
  @Input() rental!: Rental;
  logoPath: string = '';

  ngOnInit(): void {
    this.logoPath = logoPaths[this.rental.car.brand];
  }
}
