import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RentalsOverviewComponent } from './rentals-overview.component';

@Component({ selector: 'app-create-rental-card', template: '' })
class CreateRentalCardStub {}

describe('RentalsOverviewComponent', () => {
  let component: RentalsOverviewComponent;
  let fixture: ComponentFixture<RentalsOverviewComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [RentalsOverviewComponent, CreateRentalCardStub],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
