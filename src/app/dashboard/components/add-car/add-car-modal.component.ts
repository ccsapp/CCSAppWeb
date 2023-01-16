import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css'],
})
export class AddCarModalComponent implements OnInit {
  @ViewChild('vinField') vinField!: ElementRef;
  vinInput = new FormControl('');

  modalId = 'add-car-modal';
  errorMessage?: string;
  loading = false;

  constructor(
    private fleetDataService: FleetDataService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.watch(this.modalId).subscribe((isOpen) => {
      if (!isOpen) {
        this.vinInput.reset();
        this.errorMessage = undefined;
      }
    });
  }

  openModal() {
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId);
  }

  onSubmit() {
    // prevent submitting a syntactically invalid VIN or a VIN that was rejected by the backend immediately before
    // (without changing vinField in the meantime)
    if (this.vinInput.valid && this.vinInput.dirty) {
      this.addCar(this.vinInput.value!);
      return;
    }
    this.vinField.nativeElement.focus();
  }

  addCar(vin: string) {
    // mark as not dirty
    this.vinInput.markAsPristine();

    //syntax validation is handled by the template
    this.loading = true;
    this.fleetDataService.addCar(vin).subscribe({
      next: (res: HttpResponse<null>) => {
        this.loading = false;
        if (res?.status == HttpStatusCode.NoContent) {
          this.modalService.updateErrorMessage(
            `The car with VIN "${vin}" already belongs to the fleet.`
          );
        }
        this.errorMessage = undefined;
        this.closeModal();
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
