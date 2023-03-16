import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TrunkOpenerViewComponent } from './trunk-opener-view.component';
import { SCHEDULER } from '../util';
import { TestScheduler } from 'rxjs/testing';

describe('TrunkOpenerViewComponent', () => {
  let testScheduler: TestScheduler;

  let component: TrunkOpenerViewComponent;
  let fixture: ComponentFixture<TrunkOpenerViewComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toBe(expected)
    );

    const hcSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete']);

    await TestBed.configureTestingModule({
      declarations: [TrunkOpenerViewComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: hcSpy },
        { provide: SCHEDULER, useValue: testScheduler },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                vin: 'WVWAA71K08W201030',
              },
              queryParams: { token: 'bumrLuCMbumrLuCMbumrLuCM' },
            },
          },
        },
      ],
    }).compileComponents();

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientSpy.get.and.returnValue(of({ trunkLockState: 'UNLOCKED' }));
    fixture = TestBed.createComponent(TrunkOpenerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
