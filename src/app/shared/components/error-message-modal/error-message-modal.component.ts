import { Component, HostListener } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-error-message-modal',
  templateUrl: './error-message-modal.component.html',
  styleUrls: ['./error-message-modal.component.css'],
})
export class ErrorMessageModalComponent {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closeModal();
  }

  errorMessage$ = this.modalService.errorMessage;

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.updateErrorMessage(null);
  }
}
