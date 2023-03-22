import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { RentalBookingService } from 'src/app/services/rental-booking.service';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { AvailableCar } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-create-rental-card',
  templateUrl: './create-rental-card.component.html',
  styleUrls: ['./create-rental-card.component.css'],
})
export class CreateRentalCardComponent implements OnInit, OnDestroy {
  results?: AvailableCar[];
  errorMessage?: string;
  loading: boolean = false;
  isFirefox = false;

  private bookingSubscription?: Subscription;

  timePeriodForm = new FormGroup({
    startDate: new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    }),
    endDate: new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    }),
  });

  constructor(
    private rentalData: RentalDataService,
    private rentalBooking: RentalBookingService,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.isFirefox = this.deviceService.browser === 'Firefox';
    this.bookingSubscription = this.rentalBooking.bookingComplete$.subscribe(
      () => this.clearResults()
    );
  }

  ngOnDestroy(): void {
    if (this.bookingSubscription) this.bookingSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.loading = true;

    if (!this.timePeriodForm.valid) {
      this.results = undefined;
      this.errorMessage = 'Supply a time period first.';
      this.loading = false;
      return;
    }
    const timePeriod = {
      startDate: new Date(
        `${this.timePeriodForm.value.startDate?.date}T${this.timePeriodForm.value.startDate?.time}`
      ),
      endDate: new Date(
        `${this.timePeriodForm.value.endDate?.date}T${this.timePeriodForm.value.endDate?.time}`
      ),
    };

    if (timePeriod.startDate < new Date()) {
      this.results = undefined;
      this.errorMessage = 'The given time period begins in the past.';
      this.loading = false;
      return;
    }

    if (timePeriod.startDate >= timePeriod.endDate) {
      this.results = undefined;
      this.errorMessage = 'The given time period is invalid.';
      this.loading = false;
      return;
    }

    this.rentalBooking.rentalPeriod = timePeriod;

    this.rentalData.getAvailableCars(timePeriod).subscribe({
      next: (data) => {
        this.errorMessage = undefined;
        this.results = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.results = undefined;
        console.log(err?.error?.message);
        this.errorMessage = 'Communication with the server failed.';
        this.loading = false;
      },
    });
  }

  clearResults() {
    this.results = undefined;
  }

  currentDate() {
    return new Date().toISOString().split('T')[0];
  }
}
