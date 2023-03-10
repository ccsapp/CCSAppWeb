import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';
import { SCHEDULER } from 'src/app/util';
import { Rental } from 'src/app/_models/rental-data';

import { DynamicDataCardComponent } from './dynamic-data-card.component';

describe('DynamicDataCardComponent', () => {
  let component: DynamicDataCardComponent;
  let fixture: ComponentFixture<DynamicDataCardComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const rental: Rental = {
    id: 'cpZ6IIwD',
    state: 'EXPIRED',
    rentalPeriod: {
      startDate: new Date('2017-07-21T17:32:28.000Z'),
      endDate: new Date('2017-07-21T17:32:28.000Z'),
    },
    car: {
      brand: 'Audi',
      model: 'A3',
      vin: 'WVWAA71K08W201031',
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
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DynamicDataCardComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: SCHEDULER, useValue: TestScheduler },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicDataCardComponent);
    component = fixture.componentInstance;
    component.rental = rental;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
