import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css'],
})
export class AddCarModalComponent implements OnInit {
  modalId = 'add-car-modal';
  vinToAdd: string = '';
  errorMessage?: string;
  loading = false;

  constructor(
    private fleetDataService: FleetDataService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.watch(this.modalId).subscribe((isOpen) => {
      if (!isOpen) {
        this.vinToAdd = '';
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
    if (!this.vinToAdd) {
      this.errorMessage = 'Please provide a VIN';
      return;
    }
    this.errorMessage = undefined;
    this.loading = true;
    this.fleetDataService.addCar(this.vinToAdd).subscribe({
      next: (res: HttpResponse<null>) => {
        this.loading = false;
        if (res?.status == HttpStatusCode.NoContent) {
          this.modalService.updateErrorMessage(
            `The car with VIN "${this.vinToAdd}" already belongs to the fleet.`
          );
        }
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err?.status == HttpStatusCode.BadRequest) {
          this.errorMessage = 'Invalid VIN, please try again.';
          return;
        }
        const message = err?.error?.message;
        this.errorMessage = message
          ? message
          : 'Communication with the server failed, please try again later';
      },
    });
  }
}
