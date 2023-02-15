import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailedCar } from 'src/app/_models/fleet-data';

import { CarDetailComponent } from './car-detail.component';

describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  @Component({
    selector: 'app-static-data-card',
    template: '',
    inputs: ['car'],
  })
  class StaticDataCardStub {}

  @Component({
    selector: 'app-dynamic-data-card',
    template: '',
    inputs: ['car'],
  })
  class DyanmicDataCardStub {}

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
      fuel: 'ELECTRIC',
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
      fuelCapacity: '54.0L;85.2kWh',
    },
    dynamicData: {
      doorsLockState: 'LOCKED',
      engineState: 'ON',
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
      rentalPeriod: {
        startDate: new Date(2021, 7, 21),
        endDate: new Date(2021, 8, 21),
      },
      customer: {
        customerId: 'd9ChwOvI',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CarDetailComponent,
        StaticDataCardStub,
        DyanmicDataCardStub,
      ],
      imports: [RouterTestingModule],

      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    component.car = detailedCar;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
