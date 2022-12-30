import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorMessageModalComponent } from './components/error-message-modal/error-message-modal.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ModalComponent, ErrorMessageModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent, ErrorMessageModalComponent],
})
export class SharedModule {}
