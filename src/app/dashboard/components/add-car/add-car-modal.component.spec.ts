import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCarModalComponent } from './add-car-modal.component';

describe('ModalAddCarComponent', () => {
  let component: AddCarModalComponent;
  let fixture: ComponentFixture<AddCarModalComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [AddCarModalComponent],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
