import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetOverviewComponent } from './components/fleet-overview/fleet-overview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [FleetOverviewComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
