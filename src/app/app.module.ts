import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { asyncScheduler } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { FleetManagerDashboardModule } from './fleet-manager-dashboard/fleet-manager-dashboard.module';
import { SharedModule } from './shared/shared.module';
import { SCHEDULER } from './util';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FleetManagerDashboardModule,
    CustomerDashboardModule,
    SharedModule,
  ],
  providers: [{ provide: SCHEDULER, useValue: asyncScheduler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
