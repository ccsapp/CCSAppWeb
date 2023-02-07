import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { SCHEDULER } from '../util';

import { Toast, ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  let testScheduler: TestScheduler;

  const toast1: Toast = {
    message: 'Error deleting car. Car does not exist.',
  };

  const toast2: Toast = {
    message: 'Audi, A3 removed',
    action: () => console.log('test action'),
  };

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: SCHEDULER, useValue: testScheduler },
      ],
    });

    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('toast works', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-abc(d|)', {
        a: [toast1, true],
        b: [toast2, true],
        c: [toast1, false],
        d: [toast2, false],
      }).subscribe(([toast, isAdd]) => {
        if (isAdd) {
          service.addToast(toast as Toast);
        } else {
          service.removeToast(toast as Toast);
        }
      });

      expectObservable(service.toast$).toBe('abcda', {
        a: [],
        b: [toast1],
        c: [toast1, toast2],
        d: [toast2],
      });
    });
  });

  it('toast timeout works', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(a|)', {
        a: toast1,
      }).subscribe((toast) => service.addToast(toast));

      expectObservable(service.toast$).toBe('ab 4999ms a', {
        a: [],
        b: [toast1],
      });
    });
  });

  it('toast timeout gets reset', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-ab(c|)', {
        a: [toast1, true],
        b: [toast1, false],
        c: [toast1, true],
      }).subscribe(([toast, isAdd]) => {
        if (isAdd) {
          service.addToast(toast as Toast);
        } else {
          service.removeToast(toast as Toast);
        }
      });

      expectObservable(service.toast$).toBe('abab 4999ms a', {
        a: [],
        b: [toast1],
      });
    });
  });
});
