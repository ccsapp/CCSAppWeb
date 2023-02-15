import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './fleet-manager-dashboard/components/car-detail/car-detail.component';
import { FleetOverviewComponent } from './fleet-manager-dashboard/components/fleet-overview/fleet-overview.component';

const routes: Routes = [
  { path: '', component: FleetOverviewComponent },
  { path: 'dashboard', component: FleetOverviewComponent },
  { path: 'dashboard/:vin', component: CarDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
