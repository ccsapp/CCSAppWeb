import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { NavbarState, TitleService } from './title.service';

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

  it('navbarState works', () => {
    const navbarState1: NavbarState = {
      title: 'a title',
    };

    const navbarState2: NavbarState = {
      title: 'some other title',
      backButtonPath: 'some path',
      titleIconPath: 'some icon path',
    };

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-a(b|)', {
        a: navbarState1,
        b: navbarState2,
      }).subscribe((title) => service.setNavbarState(title));

      expectObservable(service.navbarState$).toBe('abc', {
        a: { title: '' },
        b: navbarState1,
        c: navbarState2,
      });
    });
  });
});
