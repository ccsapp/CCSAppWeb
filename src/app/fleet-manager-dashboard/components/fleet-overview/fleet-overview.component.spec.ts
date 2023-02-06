import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetOverviewComponent } from './fleet-overview.component';
import { Component } from '@angular/core';

@Component({ selector: 'app-add-car-card', template: '' })
class AddCarCardStub {}
@Component({ selector: 'app-remove-car-modal', template: '' })
class RemoveCarModalStub {}
@Component({ selector: 'app-error-message-modal', template: '' })
class ErrorMessageModalStub {}

describe('FleetOverviewComponent', () => {
  let component: FleetOverviewComponent;
  let fixture: ComponentFixture<FleetOverviewComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [
        FleetOverviewComponent,
        AddCarCardStub,
        RemoveCarModalStub,
        ErrorMessageModalStub,
      ],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
