import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { EMPTY, filter, map, tap } from 'rxjs';
import { RentalDetailComponent } from './customer-dashboard/components/rental-detail/rental-detail.component';
import { RentalsOverviewComponent } from './customer-dashboard/components/rentals-overview/rentals-overview.component';
import { CarDetailComponent } from './fleet-manager-dashboard/components/car-detail/car-detail.component';
import { FleetOverviewComponent } from './fleet-manager-dashboard/components/fleet-overview/fleet-overview.component';
import { GoodbyeComponent } from './goodbye/goodbye.component';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TrunkOpenerViewComponent } from './trunk-opener-view/trunk-opener-view.component';

/* the routing array uses canMatch to skip entries if the user does (not) have
   the corresponding login status or role
 */
const routes: Routes = [
  // --- publicly accessible routes ---
  { path: 'trunkAccess/:vin', component: TrunkOpenerViewComponent },

  // --- authentication routes ---
  // the route the user is redirected to after login/logout
  {
    path: 'auth',
    component: GoodbyeComponent,
    canActivate: [
      () => {
        // this component should only be displayed if the user is logged out, otherwise sending a redirect
        const authService = inject(AuthService);
        const router = inject(Router);

        return inject(AuthService).loggedIn$.pipe(
          filter((value) => value !== undefined), // skip the initial unitialized state
          map((user) => {
            if (user) {
              // if the user is logged in redirect to home page/saved URL
              // by returning a URLTree from canActivate to the router
              return router.parseUrl(authService.getRedirectURL());
            } else {
              // this should only be visible when the user is not logged in
              return true;
            }
          })
        );
      },
    ],
  },
  // the general security guard for redirecting every URL to the login screen
  // this route is never really accessed: it either redirects to the login or marks itself as unmatchable
  {
    matcher: (segments) => {
      // this effectively matches everything because matching with {path: "**"} bypasses canMatch evaluation
      return { consumed: segments };
    },
    canMatch: [
      // the passed segments are the accessed URL split at '/'
      (_, segments) => {
        const service = inject(AuthService);

        return service.loggedIn$.pipe(
          filter((value) => value !== undefined), // skip the initial unitialized state
          map(
            // this should match when a non-public URL is accessed and the user is not logged in
            (user) => !user
          ),
          tap({
            next: (loggedOut) => {
              if (loggedOut) {
                // redirect the user directly to the OAuth login and preserve accessed URL
                service.login(segments.join('/'));
              }
            },
          })
        );
      },
    ],
    loadComponent: () => EMPTY, // Angular requires a defined component
  },

  // --- secured routes ---
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canMatch: [
      () => {
        return inject(AuthService).loggedIn$.pipe(
          filter((value) => value !== undefined),
          map((user) => (user && user.isCustomer()) || false)
        );
      },
    ],
    children: [
      { path: '', component: RentalsOverviewComponent },
      { path: ':id', component: RentalDetailComponent },
    ],
  },
  {
    path: 'dashboard',
    canMatch: [
      () => {
        return inject(AuthService).loggedIn$.pipe(
          filter((value) => value !== undefined),
          map((user) => (user && user.isFleetManager()) || false)
        );
      },
    ],
    children: [
      { path: '', component: FleetOverviewComponent },
      { path: ':vin', component: CarDetailComponent },
    ],
  },

  // 404 page for logged in users
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
