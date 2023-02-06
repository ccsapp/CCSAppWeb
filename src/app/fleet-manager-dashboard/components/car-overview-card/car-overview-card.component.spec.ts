import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOverviewCardComponent } from './car-overview-card.component';

describe('CarOverviewCardComponent', () => {
  let component: CarOverviewCardComponent;
  let fixture: ComponentFixture<CarOverviewCardComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);
    await TestBed.configureTestingModule({
      declarations: [CarOverviewCardComponent],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
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
