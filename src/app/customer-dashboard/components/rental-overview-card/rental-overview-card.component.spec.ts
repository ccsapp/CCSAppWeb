import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rental } from 'src/app/_models/rental-data';

import { RentalOverviewCardComponent } from './rental-overview-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RentalOverviewCardComponent', () => {
  let component: RentalOverviewCardComponent;
  let fixture: ComponentFixture<RentalOverviewCardComponent>;

  const carRental: Rental = {
    id: 'cpZ6IIwD',
    state: 'ACTIVE',
    rentalPeriod: {
      startDate: new Date('2017-07-21T17:32:28.000Z'),
      endDate: new Date('2017-07-21T17:32:28.000Z'),
    },
    car: {
      brand: 'Audi',
      model: 'A3',
      vin: 'WVWAA71K08W201031',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalOverviewCardComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalOverviewCardComponent);
    component = fixture.componentInstance;
    component.rental = carRental;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
