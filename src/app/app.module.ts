import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';
import { asyncScheduler } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { FleetManagerDashboardModule } from './fleet-manager-dashboard/fleet-manager-dashboard.module';
import { SharedModule } from './shared/shared.module';
import { SCHEDULER } from './util';
import { TrunkOpenerViewModule } from './trunk-opener-view/trunk-opener-view.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.FLEETM_API_URL, environment.RENTALM_API_URL],
        sendAccessToken: true,
      },
    }),
    AppRoutingModule,
    FleetManagerDashboardModule,
    CustomerDashboardModule,
    TrunkOpenerViewModule,
    SharedModule,
  ],
  providers: [{ provide: SCHEDULER, useValue: asyncScheduler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
