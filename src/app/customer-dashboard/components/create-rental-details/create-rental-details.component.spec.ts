import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { SCHEDULER } from 'src/app/util';

import { CreateRentalDetailsComponent } from './create-rental-details.component';

describe('CreateRentalDetailsComponent', () => {
  let testScheduler: TestScheduler;

  let component: CreateRentalDetailsComponent;
  let fixture: ComponentFixture<CreateRentalDetailsComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    await TestBed.configureTestingModule({
      declarations: [CreateRentalDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: SCHEDULER, useValue: testScheduler }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRentalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
