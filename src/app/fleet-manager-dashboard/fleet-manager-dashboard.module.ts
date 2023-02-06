import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddCarCardComponent } from './components/add-car-card/add-car-card.component';
import { FleetOverviewComponent } from './components/fleet-overview/fleet-overview.component';
import { RemoveCarModalComponent } from './components/remove-car/remove-car-modal.component';
import { CarOverviewCardComponent } from './components/car-overview-card/car-overview-card.component';

@NgModule({
  declarations: [
    FleetOverviewComponent,
    RemoveCarModalComponent,
    AddCarCardComponent,
    CarOverviewCardComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
})
export class FleetManagerDashboardModule {}
