import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { SCHEDULER } from 'src/app/util';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let testScheduler: TestScheduler;

  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [{ provide: SCHEDULER, useValue: testScheduler }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
