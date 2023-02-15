import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { TitleService } from 'src/app/services/title.service';
import { DetailedCar } from 'src/app/_models/fleet-data';
import paths from 'src/assets/brands/brands.json';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fleetData: FleetDataService,
    private titleService: TitleService
  ) {}

  car!: DetailedCar;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const vin = params['vin'];
      this.fleetData.getCarDetailed(vin).subscribe({
        next: (car) => {
          this.car = car;
          this.titleService.setNavbarState({
            title: `${car.brand}, ${car.model}`,
            titleIconPath: paths[car.brand],
            backButtonPath: '/dashboard',
          });
        },
        error: (err) => {
          this.titleService.setNavbarState({
            title:
              err.status == HttpStatusCode.NotFound
                ? 'Car Not Found, Maybe It Was Deleted?'
                : ' An Error Occurred',
            backButtonPath: '/dashboard',
          });
        },
      });
    });
  }
}
