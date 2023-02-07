import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDataCardComponent } from '../fleet-manager-dashboard/components/dynamic-data-card/dynamic-data-card.component';
import { SharedModule } from '../shared/shared.module';
import { AddCarCardComponent } from './components/add-car-card/add-car-card.component';
import { CarOverviewCardComponent } from './components/car-overview-card/car-overview-card.component';
import { FleetOverviewComponent } from './components/fleet-overview/fleet-overview.component';

@NgModule({
  declarations: [
    FleetOverviewComponent,
    AddCarCardComponent,
    CarOverviewCardComponent,
    DynamicDataCardComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
})
export class FleetManagerDashboardModule {}
