import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { environment } from '../../environments/environment';
import { Car, DetailedCar } from '../_models/fleet-data';
import { FleetDataService } from './fleet-data.service';

describe('FleetDataService', () => {
  const fleetBaseLink = environment.API_URL + '/fleets/' + environment.FLEET_ID;

  const car1: Car = {
    vin: 'WVWAA71K08W201030',
    brand: 'Audi',
    model: 'A3',
    productionDate: new Date(2017, 7, 21),
  };

  const car2: Car = {
    vin: 'WVWAA71K08W201031',
    brand: 'Audi',
    model: 'A4',
    productionDate: new Date(2018, 7, 21),
  };

  const carsSingle = [car1];
  const carsBoth = [car1, car2];

  const detailedCar: DetailedCar = {
    vin: 'WVWAA71K08W201030',
    brand: 'Audi',
    model: 'A3',
    productionDate: new Date(2017, 7, 21),
    technicalSpecification: {
      color: 'black',
      weight: 1320,
      trunkVolume: 435,
      engine: {
        type: '180 CDI',
        power: 150,
      },
      transmission: 'MANUAL',
      tire: {
        manufacturer: 'GOODYEAR',
        type: '185/65R15',
      },
      numberOfSeats: 7,
      numberOfDoors: 5,
      fuel: 'HYBRID_DIESEL',
      fuelCapacity: '54.0L;85.2kWh',
      consumption: {
        city: 6.4,
        overland: 4.6,
        combined: 5.2,
      },
      emissions: {
        city: 168,
        overland: 122,
        combined: 137,
      },
    },
    dynamicData: {
      doorsLockState: 'UNLOCKED',
      engineState: 'OFF',
      fuelLevelPercentage: 23,
      position: {
        latitude: 49.0069,
        longitude: 8.4037,
      },
      trunkLockState: 'UNLOCKED',
    },
    rental: {
      id: 'rZ6IIwcD',
      active: true,
      customer: {
        customerId: 'd9ChwOvI',
      },
      rentalPeriod: {
        startDate: new Date('2017-07-21T17:32:28Z'),
        endDate: new Date('2017-07-21T17:32:28Z'),
      },
    },
  };

  let testScheduler: TestScheduler;

  let service: FleetDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    TestBed.configureTestingModule({
      providers: [FleetDataService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(FleetDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCars returns car data on success', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: fleetBaseLink + '/cars',
          })
          .flush(carsSingle);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getCars()).toBe('-(a|)', { a: carsSingle });
    });

    httpTestingController.verify();
  });

  it('getCars returns error on failure', () => {
    const url = fleetBaseLink + '/cars';
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Some error',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({ method: 'GET', url: url })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getCars()).toBe('-#', undefined, error);
    });

    httpTestingController.verify();
  });

  it('addCar triggers reload on success', () => {
    const url = fleetBaseLink + '/cars/WVWAA71K08W201031';

    const resp = new HttpResponse({
      body: null,
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
            url: fleetBaseLink + '/cars',
          });

          expect(reqs).toHaveSize(2);

          // the first request to /cars should provide the first response
          reqs[0].flush(carsSingle);
        },
        b: () => {
          // respond to the addCar request, second
          httpTestingController
            .expectOne({ method: 'PUT', url: url })
            .flush(null);
        },
        c: () => {
          // this request was matched before but is now responded to
          reqs[1].flush(carsBoth);
        },
      }).subscribe((f) => f());

      expectObservable(service.dataChanged).toBe('a-a-', { a: null });

      expectObservable(service.getCars()).toBe('-(a|)', { a: carsSingle });
      expectObservable(service.addCar('WVWAA71K08W201031')).toBe('--(a|)', {
        a: resp,
      });
      expectObservable(service.getCars()).toBe('---(a|)', { a: carsBoth });
    });

    httpTestingController.verify();
  });

  it('addCar does nothing on failure', () => {
    const url = fleetBaseLink + '/cars/WVWAA71K08W201030';
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

      expectObservable(service.addCar('WVWAA71K08W201030')).toBe(
        '-#',
        undefined,
        error
      );
    });

    httpTestingController.verify();
  });

  it('getCarDetailed returns car data on success', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({
            method: 'GET',
            url: fleetBaseLink + '/cars/WVWAA71K08W201030',
          })
          .flush(detailedCar);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getCarDetailed('WVWAA71K08W201030')).toBe(
        '-(a|)',
        { a: detailedCar }
      );
    });

    httpTestingController.verify();
  });

  it('getCarDetailed returns error on failure', () => {
    const url = fleetBaseLink + '/cars/WVWAA71K08W201030';
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Some error',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({ method: 'GET', url: url })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('a-', { a: null });

      expectObservable(service.getCarDetailed('WVWAA71K08W201030')).toBe(
        '-#',
        undefined,
        error
      );
    });

    httpTestingController.verify();
  });

  it('removeCar triggers reload on success', () => {
    const url = fleetBaseLink + '/cars/WVWAA71K08W201031';

    const resp = new HttpResponse({
      body: null,
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
            url: fleetBaseLink + '/cars',
          });

          expect(reqs).toHaveSize(2);

          // the first request to /cars should provide the first response
          reqs[0].flush(carsBoth);
        },
        b: () => {
          // respond to the removeCar request, second
          httpTestingController
            .expectOne({ method: 'DELETE', url: url })
            .flush(null);
        },
        c: () => {
          // this request was matched before but is now responded to
          reqs[1].flush(carsSingle);
        },
      }).subscribe((f) => f());

      expectObservable(service.dataChanged).toBe('a-a-', { a: null });

      expectObservable(service.getCars()).toBe('-(a|)', { a: carsBoth });
      expectObservable(service.removeCar('WVWAA71K08W201031')).toBe('--(a|)', {
        a: resp,
      });
      expectObservable(service.getCars()).toBe('---(a|)', { a: carsSingle });
    });

    httpTestingController.verify();
  });

  it('removeCar also triggers reload on failure', () => {
    const url = fleetBaseLink + '/cars/WVWAA71K08W201030';
    const error: HttpErrorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not found',
      url: url,
    });

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)').subscribe((_) => {
        httpTestingController
          .expectOne({ method: 'DELETE', url: url })
          .flush(null, error);
      });

      expectObservable(service.dataChanged).toBe('aa', { a: null });

      expectObservable(service.removeCar('WVWAA71K08W201030')).toBe(
        '-#',
        undefined,
        error
      );
    });

    httpTestingController.verify();
  });
});
