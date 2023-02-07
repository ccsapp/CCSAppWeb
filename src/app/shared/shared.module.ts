import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [NavbarComponent, ToastComponent],
  imports: [CommonModule, RouterModule, BrowserAnimationsModule],
  exports: [NavbarComponent, ToastComponent],
})
export class SharedModule {}
