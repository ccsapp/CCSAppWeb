import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetOverviewComponent } from './components/fleet-overview/fleet-overview.component';

const routes: Routes = [
  { path: '', component: FleetOverviewComponent },
  { path: 'overview', component: FleetOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
