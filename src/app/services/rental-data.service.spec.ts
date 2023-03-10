import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { environment } from 'src/environments/environment';

import { AvailableCar, Car, Rental, TrunkAccess } from '../_models/rental-data';
import { RentalDataService } from './rental-data.service';

const compareDates = (d1: string, d2: string) => {
  return new Date(d1).toString() === new Date(d2).toString();
};

describe('RentalDataService', () => {
  let testScheduler: TestScheduler;

  let service: RentalDataService;
  let httpTestingController: HttpTestingController;

  const fleetBaseLink = environment.RENTALM_API_URL;
  const startDate = '2017-07-21T17:32:28.000Z';
  const endDate = '2017-07-21T17:32:28.000Z';
  const rentalId = 'rZ6IIwcD';

  const availableCar1: AvailableCar = {
    vin: 'WVWAA71K08W201031',
    brand: 'Audi',
    model: 'A3',
    numberOfSeats: 5,
  };
  const availableCar2: AvailableCar = {
    vin: 'WVWAA71K08W201030',
    brand: 'Audi',
    model: 'A5',
    numberOfSeats: 5,
  };

  const carRental1: Rental = {
    id: 'cpZ6IIwD',
    state: 'EXPIRED',
    rentalPeriod: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
    car: {
      brand: 'Audi',
      model: 'A3',
      vin: 'WVWAA71K08W201031',
    },
  };

  const carRental2: Rental = {
    id: 'lsnej8or',
    state: 'ACTIVE',
    rentalPeriod: {
      startDate: new Date('2021-01-21T17:32:28.000Z'),
      endDate: new Date('2021-01-21T17:32:28.000Z'),
    },
    car: {
      brand: 'Opel',
      model: 'Astra',
      vin: 'WVWAA71K08W201555',
    },
  };

  const carWithTechnicalSpecification: Car = {
    vin: 'WVWAA71K08W201030',
    brand: 'Audi',
    model: 'A3',
    technicalSpecification: {
      color: 'black',
      weight: 1320,
      trunkVolume: 435,
      engine: {
        type: '180 CDI',
        power: 150,
      },
      transmission: 'MANUAL',
      numberOfSeats: 7,
      numberOfDoors: 5,
      fuel: 'ELECTRIC',
      consumption: {
        city: 6.4,
        overland: 4.6,
        combined: 5.2,
      },
      emissions: {
        city: 6.4,
        overland: 4.6,
        combined: 5.2,
      },
      fuelCapacity: '45kWh',
    },
  };

  const trunkAccess: TrunkAccess = {
    token: 'bumrLuCMbumrLuCMbumrLuCM',
    validityPeriod: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  };

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    TestBed.configureTestingModule({
      providers: [RentalDataService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(RentalDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAvailableCars returns available cars on success', () => {
    const url =
      fleetBaseLink + `/cars?startDate=${startDate}&endDate=${endDate}`;

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush([availableCar1, availableCar2]);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.getAvailableCars({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      ).toBe('-(a|)', { a: [availableCar1, availableCar2] });
    });

    httpTestingController.verify();
  });

  it('getAvailableCars returns error on failure', () => {
    const url =
      fleetBaseLink + `/cars?startDate=${startDate}&endDate=${endDate}`;

    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'an error occurred',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.getAvailableCars({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      ).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  });

  it('getCar returns data about car on success', () => {
    const url = fleetBaseLink + `/cars/${carWithTechnicalSpecification.vin}`;

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(carWithTechnicalSpecification);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getCar(carWithTechnicalSpecification.vin)).toBe(
        '-(a|)',
        { a: carWithTechnicalSpecification }
      );
    });

    httpTestingController.verify();
  });

  it('getCar returns error on failure', () => {
    const url = fleetBaseLink + `/cars/${carWithTechnicalSpecification.vin}`;

    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'an error occurred',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getCar(carWithTechnicalSpecification.vin)).toBe(
        '-#',
        undefined,
        error
      );
    });

    httpTestingController.verify();
  });

  it('createRental works (with reload)', () => {
    const url =
      fleetBaseLink +
      `/cars/${carWithTechnicalSpecification.vin}/rentals?customerId=${environment.CUSTOMER_ID}`;

    const response = new HttpResponse({
      status: 201,
      statusText: 'created',
      url: url,
    });

    let reqs: TestRequest[];

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-ab(c|)', {
        a: () => {
          // get and cache the matched requests to the given route b/c there are multiple ones
          reqs = httpTestingController.match({
            method: 'GET',
            url:
              fleetBaseLink + `/rentals?customerId=${environment.CUSTOMER_ID}`,
          });

          expect(reqs.length).toBe(2);
          // the first request to /rentals should provide the first response
          reqs[0].flush(carRental1);
        },
        b: () => {
          // respond to the createRental request, second
          const createRequests = httpTestingController.match((reqs) => {
            return (
              reqs.method === 'POST' &&
              reqs.urlWithParams === url &&
              compareDates(reqs.body.startDate, startDate) &&
              compareDates(reqs.body.endDate, endDate)
            );
          });
          expect(createRequests.length).toBe(1);
          createRequests[0].flush(null, response);
        },
        c: () => {
          // this request was matched before but is now responded to
          reqs[1].flush([carRental1, carRental2]);
        },
      }).subscribe((f) => f());

      expectObservable(service.dataChanged).toBe('a-a-', { a: null });

      expectObservable(service.getOverview()).toBe('-(a|)', { a: carRental1 });

      expectObservable(
        service.createRental(carWithTechnicalSpecification.vin, {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      ).toBe('--(a|)', { a: response });

      expectObservable(service.getOverview()).toBe('---(a|)', {
        a: [carRental1, carRental2],
      });
    });

    httpTestingController.verify();
  });

  it('createRental returns error on failure', () => {
    const url =
      fleetBaseLink +
      `/cars/${carWithTechnicalSpecification.vin}/rentals?customerId=${environment.CUSTOMER_ID}`;

    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Some error',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({ method: 'POST', url: url })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.createRental(carWithTechnicalSpecification.vin, {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      ).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  });

  it('getTrunkLockState works', () => {
    service.trunkAccessToken = 'bumrLuCMbumrLuCMbumrLuCM';
    const url =
      fleetBaseLink +
      `/cars/${carWithTechnicalSpecification.vin}/trunk?trunkAccessToken=${service.trunkAccessToken}`;

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush({ trunkLockState: true });
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.getTrunkLockState(carWithTechnicalSpecification.vin)
      ).toBe('-(a|)', { a: true });
    });

    httpTestingController.verify();
  });

  it('getTrunkLockState returns error on failure', () => {
    service.trunkAccessToken = 'bumrLuCMbumrLuCMbumrLuCM';

    const url =
      fleetBaseLink +
      `/cars/${carWithTechnicalSpecification.vin}/trunk?trunkAccessToken=${service.trunkAccessToken}`;

    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'an error occurred',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.getTrunkLockState(carWithTechnicalSpecification.vin)
      ).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  });

  function testSetTrunkLockStateSuccess(isCustomer: boolean) {
    let url: string;
    if (!isCustomer) {
      service.trunkAccessToken = 'bumrLuCMbumrLuCMbumrLuCM';
      url =
        fleetBaseLink +
        `/cars/${carWithTechnicalSpecification.vin}/trunk?trunkAccessToken=${service.trunkAccessToken}`;
    } else {
      url =
        fleetBaseLink +
        `/cars/${carWithTechnicalSpecification.vin}/trunk?customerId=${environment.CUSTOMER_ID}`;
    }

    const rentalId = 'rZ6IIwcD';

    let rentalUnlocked: Rental = carRental1;

    rentalUnlocked.car.dynamicData = {
      doorsLockState: 'LOCKED',
      trunkLockState: 'UNLOCKED',
      fuelLevelPercentage: 0.5,
      engineState: 'OFF',
      position: { latitude: 0, longitude: 0 },
    };

    let rentalLocked: Rental = carRental2;
    rentalLocked.car.dynamicData = {
      doorsLockState: 'LOCKED',
      trunkLockState: 'LOCKED',
      fuelLevelPercentage: 0.5,
      engineState: 'OFF',
      position: { latitude: 0, longitude: 0 },
    };

    const response = new HttpResponse({
      status: 204,
      statusText: 'No Content',
      url: url,
    });

    let reqs: TestRequest[];

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-ab(c|)', {
        a: () => {
          // get and cache the matched requests to the given route b/c there are multiple ones
          reqs = httpTestingController.match({
            method: 'GET',
            url: fleetBaseLink + `/rentals/${rentalId}`,
          });

          expect(reqs.length).toBe(2);
          // the first request to /rentals should provide the first response
          reqs[0].flush(rentalUnlocked);
        },
        b: () => {
          // respond to the createRental request, second
          const setTrunkLockStateRequest = httpTestingController.match(
            (reqs) => {
              return (
                reqs.method === 'PUT' &&
                reqs.urlWithParams === url &&
                reqs.body.trunkLockState === 'LOCKED'
              );
            }
          );
          expect(setTrunkLockStateRequest.length).toBe(1);
          setTrunkLockStateRequest[0].flush(null);
        },
        c: () => {
          // this request was matched before but is now responded to
          reqs[1].flush(rentalLocked);
        },
      }).subscribe((f) => f());

      expectObservable(service.dataChanged).toBe('a-a-', { a: null });

      expectObservable(service.getRentalStatus(rentalId)).toBe('-(a|)', {
        a: rentalUnlocked,
      });

      expectObservable(
        service.setTrunkLockState(carWithTechnicalSpecification.vin, 'LOCKED')
      ).toBe('--(a|)', { a: response });

      expectObservable(service.getRentalStatus(rentalId)).toBe('---(a|)', {
        a: rentalLocked,
      });
    });

    httpTestingController.verify();
  }

  it('setTrunkLockState works as Customer', () => {
    testSetTrunkLockStateSuccess(true);
  });

  it('setTrunkLockState works as Trunk Opener', () => {
    testSetTrunkLockStateSuccess(false);
  });

  function testSetTrunkLockStateFailure(isCustomer: boolean) {
    let url: string;
    if (!isCustomer) {
      service.trunkAccessToken = 'bumrLuCMbumrLuCMbumrLuCM';
      url =
        fleetBaseLink +
        `/cars/${carWithTechnicalSpecification.vin}/trunk?trunkAccessToken=${service.trunkAccessToken}`;
    } else {
      url =
        fleetBaseLink +
        `/cars/${carWithTechnicalSpecification.vin}/trunk?customerId=${environment.CUSTOMER_ID}`;
    }

    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Some error',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({ method: 'PUT', url: url })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.setTrunkLockState(carWithTechnicalSpecification.vin, 'LOCKED')
      ).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  }

  it('setTrunkLockState does nothing on failure as Customer', () => {
    testSetTrunkLockStateFailure(true);
  });

  it('setTrunkLockState does nothing on failure as Trunk Opener', () => {
    testSetTrunkLockStateFailure(false);
  });

  it('getOverview returns available cars on success', () => {
    const url =
      fleetBaseLink + `/rentals?customerId=${environment.CUSTOMER_ID}`;

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush([carRental1, carRental2]);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getOverview()).toBe('-(a|)', {
        a: [carRental1, carRental2],
      });
    });

    httpTestingController.verify();
  });

  it('getOverview returns error on failure', () => {
    const url =
      fleetBaseLink + `/rentals?customerId=${environment.CUSTOMER_ID}`;

    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'an error occurred',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getOverview()).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  });

  it('getRentalStatus returns data on success', () => {
    const url = fleetBaseLink + `/rentals/${rentalId}`;

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(carRental1);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getRentalStatus(rentalId)).toBe('-(a|)', {
        a: carRental1,
      });
    });

    httpTestingController.verify();
  });

  it('getRentalStatus returns error on failure', () => {
    const url = fleetBaseLink + `/rentals/${rentalId}`;

    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'an error occurred',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: url,
          })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getRentalStatus(rentalId)).toBe(
        '-#',
        undefined,
        error
      );
    });

    httpTestingController.verify();
  });

  it('grantTrunkAccess triggers reload on success', () => {
    const url = fleetBaseLink + `/rentals/${rentalId}/trunkTokens`;

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'POST',
            url: url,
          })
          .flush(trunkAccess, { status: 201, statusText: 'No Content' });
      });

      expectObservable(service.dataChanged).toBe('aa', { a: null });

      expectObservable(
        service.grantTrunkAccess(rentalId, {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      ).toBe('-(a|)', {
        a: trunkAccess,
      });
    });

    httpTestingController.verify();
  });

  it('grantTrunkAccess does nothing on failure', () => {
    const url = fleetBaseLink + `/rentals/${rentalId}/trunkTokens`;
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Some error',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({ method: 'POST', url: url })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(
        service.grantTrunkAccess(rentalId, {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
      ).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  });
});
