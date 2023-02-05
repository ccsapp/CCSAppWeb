import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { TitleService } from './title.service';

describe('TitleService', () => {
  let testScheduler: TestScheduler;

  let service: TitleService;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    TestBed.configureTestingModule({
      providers: [TitleService],
    });

    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('title works', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-a(b|)', {
        a: 'a title',
        b: 'some other title',
      }).subscribe((title) => service.setTitle(title));

      expectObservable(service.title$).toBe('abc', {
        a: '',
        b: 'a title',
        c: 'some other title',
      });
    });
  });

  it('backButtonPath works', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-a(b|)', {
        a: '/sample-path',
        b: null,
      }).subscribe((path) => service.setBackButtonPath(path));

      expectObservable(service.backButtonPath$).toBe('abc', {
        a: null,
        b: '/sample-path',
        c: null,
      });
    });
  });

  it('titleIconPath works', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      cold('-a(b|)', {
        a: '/sample-path',
        b: null,
      }).subscribe((path) => service.setTitleIconPath(path));

      expectObservable(service.titleIcon$).toBe('abc', {
        a: null,
        b: '/sample-path',
        c: null,
      });
    });
  });
});
