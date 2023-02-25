import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { TitleService } from 'src/app/services/title.service';
import { Rental } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-rentals-overview',
  templateUrl: './rentals-overview.component.html',
  styleUrls: ['./rentals-overview.component.css'],
})
export class RentalsOverviewComponent implements OnInit {
  constructor(
    private titleService: TitleService,
    private rentalData: RentalDataService
  ) {}

  rentals$!: Observable<Rental[]>;
  dataChanged$ = this.rentalData.dataChanged;

  ngOnInit(): void {
    this.rentals$ = this.dataChanged$.pipe(
      switchMap(() => this.rentalData.getOverview())
    );
    this.titleService.setNavbarState({
      title: 'Your Rentals',
    });
  }
}
