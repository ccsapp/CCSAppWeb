import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorMessageModalComponent } from './components/error-message-modal/error-message-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [ModalComponent, ErrorMessageModalComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [ModalComponent, ErrorMessageModalComponent, NavbarComponent],
})
export class SharedModule {}
