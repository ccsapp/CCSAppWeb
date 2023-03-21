import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { TitleService } from 'src/app/services/title.service';
import { Rental } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-rentals-overview',
  templateUrl: './rentals-overview.component.html',
  styleUrls: ['./rentals-overview.component.css'],
})
export class RentalsOverviewComponent implements OnInit, OnDestroy {
  constructor(
    private titleService: TitleService,
    private rentalData: RentalDataService
  ) {}

  rentals: Rental[] | undefined;
  dataChanged$ = this.rentalData.dataChanged;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.dataChanged$
      .pipe(switchMap(() => this.rentalData.getOverview()))
      .subscribe((rentals) => {
        this.rentals = rentals.sort(this.sortRentals);
      });
    this.titleService.setNavbarState({
      title: 'Your Rentals',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sortRentals(a: Rental, b: Rental) {
    if (a.state === 'ACTIVE' && b.state !== 'ACTIVE') return -1;
    if (a.state !== 'ACTIVE' && b.state === 'ACTIVE') return 1;
    if (a.state === 'UPCOMING' && b.state !== 'UPCOMING') return -1;
    if (a.state !== 'UPCOMING' && b.state === 'UPCOMING') return 1;
    // state is equal => sort by start date
    const valueDateA = a.rentalPeriod.startDate.valueOf();
    const valueDateB = b.rentalPeriod.startDate.valueOf();
    if (valueDateA === valueDateB) return 0;
    return valueDateA > valueDateB ? -1 : 1;
  }
}
