import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RentalBookingService } from 'src/app/services/rental-booking.service';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { capitalizeWord, splitFuelCapacity } from 'src/app/util';
import { Car } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-create-rental-details',
  templateUrl: './create-rental-details.component.html',
  styleUrls: ['./create-rental-details.component.css'],
})
export class CreateRentalDetailsComponent implements OnInit {
  @Input() vin!: string;

  car?: Car;
  fuelCapacityGasoline: string = '';
  fuelCapacityElectric: string = '';

  loading: boolean = false;

  constructor(
    private rentalData: RentalDataService,
    private rentalBooking: RentalBookingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.rentalData.getCar(this.vin).subscribe((car) => {
      this.car = car;
      ({
        fuelCapacityGasoline: this.fuelCapacityGasoline,
        fuelCapacityElectric: this.fuelCapacityElectric,
      } = splitFuelCapacity(car.technicalSpecification!.fuelCapacity));
    });

    this.rentalBooking.currentlyBooking$.subscribe(
      (isBooking) => (this.loading = isBooking)
    );
  }

  capitalizeWord(word: string) {
    return capitalizeWord(word);
  }

  book() {
    this.rentalBooking.startBooking();
    this.rentalData
      .createRental(this.vin, this.rentalBooking.rentalPeriod!)
      .subscribe({
        next: () => {
          this.rentalBooking.completeBooking();
          this.toastService.addToast({
            message: `Rental booked successful.`,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.rentalBooking.abortBooking();
          if (err?.status == HttpStatusCode.Forbidden) {
            this.toastService.addToast({
              message: 'You are not allowed to book a car in the given period.',
            });
            return;
          }

          if (err?.status == HttpStatusCode.Conflict) {
            this.toastService.addToast({
              message: 'The car is no longer available.',
            });
            return;
          }

          if (err?.status == HttpStatusCode.NotFound) {
            this.toastService.addToast({
              message: 'The car does not exist.',
            });
            return;
          }

          console.log(err?.error?.message);
          this.toastService.addToast({
            message: 'Error creating rental.',
          });
        },
      });
  }
}
