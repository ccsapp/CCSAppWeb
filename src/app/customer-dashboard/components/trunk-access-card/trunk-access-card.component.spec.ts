import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { SCHEDULER } from 'src/app/util';
import { Rental } from 'src/app/_models/rental-data';

import { TrunkAccessCardComponent } from './trunk-access-card.component';

describe('TrunkAccessCardComponent', () => {
  let component: TrunkAccessCardComponent;
  let fixture: ComponentFixture<TrunkAccessCardComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const startDate = '2017-07-21T17:32:28.000Z';
  const endDate = '2017-07-21T17:32:28.000Z';

  const carRental: Rental = {
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
    token: {
      token: 'bumrLuCMbumrLuCMbumrLuCM',
      validityPeriod: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    },
  };

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [TrunkAccessCardComponent],
      providers: [
        { provide: HttpClient, useValue: hcSpy },
        { provide: SCHEDULER, useValue: TestScheduler },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrunkAccessCardComponent);
    component = fixture.componentInstance;
    component.rental = carRental;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
