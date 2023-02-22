import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';

import { RentalBookingService } from './rental-booking.service';

describe('RentalBookingService', () => {
  let testScheduler: TestScheduler;
  let service: RentalBookingService;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('startBooking should change state', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe(() => service.startBooking());
      expectObservable(service.currentlyBooking$).toBe('ab', {
        a: false,
        b: true,
      });
      expectObservable(service.bookingComplete$).toBe('--');
    });
  });

  it('abortBooking should change state', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-a(b|)').subscribe((x) =>
        x == 'a' ? service.startBooking() : service.abortBooking()
      );
      expectObservable(service.currentlyBooking$).toBe('aba', {
        a: false,
        b: true,
      });
      expectObservable(service.bookingComplete$).toBe('---');
    });
  });

  it('completeBooking should change state', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-a(b|)').subscribe((x) =>
        x == 'a' ? service.startBooking() : service.completeBooking()
      );
      expectObservable(service.currentlyBooking$).toBe('aba', {
        a: false,
        b: true,
      });
      expectObservable(service.bookingComplete$).toBe('--a', { a: undefined });
    });
  });
});
