import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrunkAccessFormComponent } from './trunk-access-form.component';

describe('TrunkAccessFormComponent', () => {
  let component: TrunkAccessFormComponent;
  let fixture: ComponentFixture<TrunkAccessFormComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [TrunkAccessFormComponent],
      providers: [{ provide: HttpClient, useValue: hcSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TrunkAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
