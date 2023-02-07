import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedCar } from 'src/app/_models/fleet-data';

import { DynamicDataCardComponent } from './dynamic-data-card.component';

describe('DynamicDataCardComponent', () => {
  let component: DynamicDataCardComponent;
  let fixture: ComponentFixture<DynamicDataCardComponent>;

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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicDataCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicDataCardComponent);
    component = fixture.componentInstance;
    component.car = detailedCar;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
