import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { AvailableCar } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-create-rental-card',
  templateUrl: './create-rental-card.component.html',
  styleUrls: ['./create-rental-card.component.css'],
})
export class CreateRentalCardComponent implements OnInit {
  results?: AvailableCar[];
  errorMessage?: string;
  loading: boolean = false;
  isFirefox = false;

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
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.isFirefox = this.deviceService.browser === 'Firefox';
  }

  onSubmit(): void {
    this.results = undefined;
    this.errorMessage = undefined;
    this.loading = true;

    if (!this.timePeriodForm.valid) {
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

    if (
      timePeriod.startDate < new Date() ||
      timePeriod.startDate >= timePeriod.endDate
    ) {
      this.errorMessage = 'The given time period is invalid.';
      this.loading = false;
      return;
    }

    this.rentalData.getAvailableCars(timePeriod).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
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
