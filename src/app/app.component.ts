import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RentalDataService } from './services/rental-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private rentalData: RentalDataService
  ) {}

  ngOnInit(): void {
    this.authService.configure();
    // whenever the login state changes, notify the rental data service
    this.authService.loggedIn$.subscribe({
      next: (user) => {
        if (user && user.isCustomer()) {
          this.rentalData.customerId = user.email;
        } else {
          this.rentalData.customerId = undefined;
        }
      },
    });
  }
}
