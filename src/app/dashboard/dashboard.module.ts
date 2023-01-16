import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddCarModalComponent } from './components/add-car/add-car-modal.component';
import { FleetOverviewComponent } from './components/fleet-overview/fleet-overview.component';
import { RemoveCarModalComponent } from './components/remove-car/remove-car-modal.component';

@NgModule({
  declarations: [
    FleetOverviewComponent,
    AddCarModalComponent,
    RemoveCarModalComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
})
export class DashboardModule {}
