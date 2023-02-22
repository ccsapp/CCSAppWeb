import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRentalCardComponent } from './components/create-rental-card/create-rental-card.component';
import { CreateRentalDetailsComponent } from './components/create-rental-details/create-rental-details.component';
import { CreateRentalResultsComponent } from './components/create-rental-results/create-rental-results.component';
import { RentalsOverviewComponent } from './components/rentals-overview/rentals-overview.component';

@NgModule({
  declarations: [
    RentalsOverviewComponent,
    CreateRentalCardComponent,
    CreateRentalResultsComponent,
    CreateRentalDetailsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CustomerDashboardModule {}
