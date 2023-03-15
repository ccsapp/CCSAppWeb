import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StaticDataCardComponent } from './components/static-data-card/static-data-card.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    NavbarComponent,
    StaticDataCardComponent,
    ToastComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, BrowserAnimationsModule],
  exports: [NavbarComponent, StaticDataCardComponent, ToastComponent],
})
export class SharedModule {}
