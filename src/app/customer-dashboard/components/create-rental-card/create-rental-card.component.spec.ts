import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentalCardComponent } from './create-rental-card.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateRentalCardComponent', () => {
  let component: CreateRentalCardComponent;
  let fixture: ComponentFixture<CreateRentalCardComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateRentalCardComponent],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRentalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
