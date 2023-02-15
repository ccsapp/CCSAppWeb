import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';
import { SCHEDULER } from 'src/app/util';

import { CarOverviewCardComponent } from './car-overview-card.component';

describe('CarOverviewCardComponent', () => {
  let testScheduler: TestScheduler;

  let component: CarOverviewCardComponent;
  let fixture: ComponentFixture<CarOverviewCardComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);
    await TestBed.configureTestingModule({
      declarations: [CarOverviewCardComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: hcSpy },
        { provide: SCHEDULER, useValue: testScheduler },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarOverviewCardComponent);
    component = fixture.componentInstance;
    component.car = {
      brand: 'Audi',
      model: 'A4',
      vin: '12345678901234567',
      productionDate: new Date(),
    };
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
