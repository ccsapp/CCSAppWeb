import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TimePeriod } from '../_models/rental-data';

@Injectable({
  providedIn: 'root',
})
export class RentalBookingService {
  rentalPeriod?: TimePeriod;
  private currentlyBooking = new BehaviorSubject(false);
  private bookingComplete = new Subject<void>();

  // this observable updates as soon as a booking request is made or finished (successfully or not)
  get currentlyBooking$() {
    return this.currentlyBooking.asObservable();
  }

  // this observable fires when a booking request succeeded
  get bookingComplete$() {
    return this.bookingComplete.asObservable();
  }

  startBooking() {
    this.currentlyBooking.next(true);
  }

  abortBooking() {
    this.currentlyBooking.next(false);
  }

  completeBooking() {
    this.currentlyBooking.next(false);
    this.bookingComplete.next();
  }
}
