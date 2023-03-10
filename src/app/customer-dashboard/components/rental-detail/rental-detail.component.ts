import { HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { TitleService } from 'src/app/services/title.service';
import { Rental } from 'src/app/_models/rental-data';
import paths from 'src/assets/brands/brands.json';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css'],
})
export class RentalDetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private rentalData: RentalDataService,
    private titleService: TitleService
  ) {}

  rental!: Rental;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    // trigger reload if data changes
    this.subscription = this.rentalData.dataChanged
      .pipe(switchMap(() => this.rentalData.getRentalStatus(id)))
      .subscribe({
        // handle success and transform car to static car
        next: (rental) => {
          this.rental = rental;
          this.titleService.setNavbarState({
            title: `${rental.car.brand} ${rental.car.model}`,
            titleIconPath: paths[rental.car.brand],
            backButtonPath: '/rentals',
          });
        },
        // hanlde error if rental not found
        error: (err) => {
          this.titleService.setNavbarState({
            title:
              err.status == HttpStatusCode.NotFound
                ? 'Rental not found.'
                : 'An Error Occurred',
            backButtonPath: '/rentals',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
