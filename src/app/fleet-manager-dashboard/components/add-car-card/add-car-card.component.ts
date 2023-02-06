import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FleetDataService } from 'src/app/services/fleet-data.service';

@Component({
  selector: 'app-add-car-card',
  templateUrl: './add-car-card.component.html',
  styleUrls: ['./add-car-card.component.css'],
})
export class AddCarCardComponent {
  @ViewChild('vinField') vinField!: ElementRef;
  vinInput = new FormControl('');

  errorMessage?: string;
  loading = false;
  submitted = false;

  constructor(private fleetData: FleetDataService) {}

  onSubmit() {
    this.submitted = true;
    // prevent submitting a syntactically invalid VIN or a VIN that was rejected by the backend immediately before
    // (without changing vinField in the meantime)
    if (this.vinInput.valid && this.vinInput.dirty) {
      this.addCar(this.vinInput.value!);
      return;
    }
    this.vinField.nativeElement.focus();
  }

  addCar(vin: string) {
    //syntax validation is handled by the template
    // mark as not dirty
    this.vinInput.markAsPristine();

    this.loading = true;
    this.errorMessage = undefined;

    this.fleetData.addCar(vin).subscribe({
      next: (res: HttpResponse<null>) => {
        this.loading = false;
        if (res?.status == HttpStatusCode.NoContent) {
          this.errorMessage = 'This car already belongs to the fleet.';
          return;
        }
        this.submitted = false;
        this.vinInput.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err?.status == HttpStatusCode.NotFound) {
          this.errorMessage = 'The car with the provided VIN was not found.';
          return;
        }
        console.log(err?.error?.message);
        this.errorMessage = 'Communication with the server failed.';
      },
    });
  }
}
