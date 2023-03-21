import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CreateRentalCardComponent } from './components/create-rental-card/create-rental-card.component';
import { CreateRentalDetailsComponent } from './components/create-rental-details/create-rental-details.component';
import { CreateRentalResultsComponent } from './components/create-rental-results/create-rental-results.component';
import { DynamicDataCardComponent } from './components/dynamic-data-card/dynamic-data-card.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { RentalOverviewCardComponent } from './components/rental-overview-card/rental-overview-card.component';
import { RentalsOverviewComponent } from './components/rentals-overview/rentals-overview.component';
import { TrunkAccessFormComponent } from './components/trunk-access-card/components/trunk-access-form/trunk-access-form.component';
import { TrunkAccessCardComponent } from './components/trunk-access-card/trunk-access-card.component';

@NgModule({
  declarations: [
    RentalsOverviewComponent,
    CreateRentalCardComponent,
    CreateRentalResultsComponent,
    CreateRentalDetailsComponent,
    RentalOverviewCardComponent,
    RentalDetailComponent,
    DynamicDataCardComponent,
    TrunkAccessCardComponent,
    TrunkAccessFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
})
export class CustomerDashboardModule {}
