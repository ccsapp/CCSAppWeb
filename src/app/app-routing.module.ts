import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalDetailComponent } from './customer-dashboard/components/rental-detail/rental-detail.component';
import { RentalsOverviewComponent } from './customer-dashboard/components/rentals-overview/rentals-overview.component';
import { CarDetailComponent } from './fleet-manager-dashboard/components/car-detail/car-detail.component';
import { FleetOverviewComponent } from './fleet-manager-dashboard/components/fleet-overview/fleet-overview.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TrunkOpenerViewComponent } from './trunk-opener-view/trunk-opener-view.component';

const routes: Routes = [
  { path: '', component: FleetOverviewComponent },
  { path: 'dashboard', component: FleetOverviewComponent },
  { path: 'dashboard/:vin', component: CarDetailComponent },
  { path: 'rentals', component: RentalsOverviewComponent },
  { path: 'rentals/:id', component: RentalDetailComponent },
  { path: 'trunkAccess/:vin', component: TrunkOpenerViewComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
