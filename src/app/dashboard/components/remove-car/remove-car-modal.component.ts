import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-remove-car-modal',
  templateUrl: './remove-car-modal.component.html',
  styleUrls: ['./remove-car-modal.component.css'],
})
export class RemoveCarModalComponent implements OnInit {
  vinToDelete!: string;
  modalId = 'remove-car-modal';
  errorMessage?: string;
  loading = false;

  constructor(
    private fleetDataService: FleetDataService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.modalService.watch(this.modalId).subscribe((isOpen) => {
      if (!isOpen) {
        this.vinToDelete = '';
        this.errorMessage = undefined;
      }
    });
  }

  openModal(vin: string) {
    this.vinToDelete = vin;
    this.modalService.open(this.modalId);
  }

  closeModal() {
    this.modalService.close(this.modalId);
  }

  remove(): void {
    this.loading = true;
    this.fleetDataService.removeCar(this.vinToDelete).subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = err.message;
      },
    });
  }
}
