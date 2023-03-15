import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { OverviewCar } from 'src/app/_models/fleet-data';
import logoPaths from 'src/assets/brands/brands.json';

@Component({
  selector: 'app-car-overview-card',
  templateUrl: './car-overview-card.component.html',
  styleUrls: ['./car-overview-card.component.css'],
})
export class CarOverviewCardComponent implements OnInit {
  @Input() car!: OverviewCar;

  logoPath: string = '';
  loading: boolean = false;

  constructor(
    private toastService: ToastService,
    private fleetData: FleetDataService
  ) {}

  ngOnInit(): void {
    this.logoPath = logoPaths[this.car.brand];
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
            this.fleetData.addCar(vin).subscribe({
              error: (err: HttpErrorResponse) => {
                this.toastService.addToast({
                  message: 'Error undoing car removal.',
                });
                console.log(err?.error?.message);
              },
            });
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
