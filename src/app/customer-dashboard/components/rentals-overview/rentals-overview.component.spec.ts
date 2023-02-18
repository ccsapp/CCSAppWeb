import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsOverviewComponent } from './rentals-overview.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-create-rental-card', template: '' })
class CreateRentalCardStub {}

describe('RentalsOverviewComponent', () => {
  let component: RentalsOverviewComponent;
  let fixture: ComponentFixture<RentalsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalsOverviewComponent, CreateRentalCardStub],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
