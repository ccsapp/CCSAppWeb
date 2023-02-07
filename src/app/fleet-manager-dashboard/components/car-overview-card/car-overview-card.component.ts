import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { Car } from 'src/app/_models/fleet-data';

@Component({
  selector: 'app-car-overview-card',
  templateUrl: './car-overview-card.component.html',
  styleUrls: ['./car-overview-card.component.css'],
})
export class CarOverviewCardComponent implements OnInit {
  @Input() car!: Car;

  path: string = '';
  loading: boolean = false;

  static paths: { [brand: string]: string } = {
    'Audi': '/assets/brands/audi.svg',
    'Mercedes-Benz': '/assets/brands/mercedes.svg',
  };

  constructor(
    private toastService: ToastService,
    private fleetData: FleetDataService
  ) {}

  ngOnInit(): void {
    this.path = this.getIconPath();
  }

  getIconPath(): string {
    return CarOverviewCardComponent.paths[this.car.brand];
  }

  /** This method handles the removal of a car from the fleet
   *  It uses the toastService to display a message to the user
   *  and to provide an undo action
   *  */
  deleteCar() {
    const vin = this.car.vin;
    this.loading = true;
    this.fleetData.removeCar(vin).subscribe({
      next: () => {
        this.loading = false;
        this.toastService.addToast({
          message: `Removed ${this.car?.brand}, ${this.car?.model}`,
          action: () => {
            this.fleetData.addCar(vin).subscribe();
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err?.status == HttpStatusCode.NotFound) {
          this.toastService.addToast({
            message: 'Error deleting car. Car does not exist.',
          });
          return;
        }
        console.log(err?.error?.message);
        this.toastService.addToast({
          message: 'Error deleting car. Communication with the server failed.',
        });
      },
    });
  }
}
