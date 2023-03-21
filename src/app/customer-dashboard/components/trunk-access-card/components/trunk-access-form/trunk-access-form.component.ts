import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { TrunkAccess } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-trunk-access-form',
  templateUrl: './trunk-access-form.component.html',
  styleUrls: ['./trunk-access-form.component.css'],
})
export class TrunkAccessFormComponent {
  @Input() rentalId!: string;
  @Input() isReplace!: boolean;
  @Output() updateTrunkAccess: EventEmitter<TrunkAccess | undefined> =
    new EventEmitter();

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

    this.rentalData.grantTrunkAccess(this.rentalId, timePeriod).subscribe({
      next: (newToken: TrunkAccess) => {
        this.loading = false;
        this.updateTrunkAccess.emit(newToken);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Forbidden) {
          this.errorMessage =
            'You are not authorized to create a trunk access token outside of your own rental period.';
          this.loading = false;
          return;
        }
        console.log(err?.error?.message);
        this.errorMessage = 'Communication with the server failed.';
        this.loading = false;
      },
    });
  }

  currentDate() {
    return new Date().toISOString().split('T')[0];
  }

  cancel() {
    this.updateTrunkAccess.emit();
  }
}
