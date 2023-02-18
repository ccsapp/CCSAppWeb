import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentalResultsComponent } from './create-rental-results.component';

describe('CreateRentalResultsComponent', () => {
  let component: CreateRentalResultsComponent;
  let fixture: ComponentFixture<CreateRentalResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRentalResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRentalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
