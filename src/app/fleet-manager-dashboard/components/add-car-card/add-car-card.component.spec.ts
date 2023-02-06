import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCarCardComponent } from './add-car-card.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddCarCardComponent', () => {
  let component: AddCarCardComponent;
  let fixture: ComponentFixture<AddCarCardComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddCarCardComponent],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
