import { TestBed } from '@angular/core/testing';
import {
  OAuthInfoEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
import { Observable, tap } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { environment } from 'src/environments/environment';
import { User } from '../_models/auth-data';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let oauthSpy: jasmine.SpyObj<OAuthService>;
  let testScheduler: TestScheduler;

  const redirectSimple = '/dashboard';
  const redirectNested = '/dashboard/cxxo58Ji';
  const user = new User('u@v.w', ['Customer']);
  const otherUser = new User('x@y.z', ['FleetManager']);

  function toSimplePromise<T>(obs: Observable<T>): Promise<T> {
    return {
      then: (handler) => {
        obs.subscribe((value) => handler && handler(value));
      },
    } as Promise<T>;
  }

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual, expected) =>
      expect(actual).toEqual(expected)
    );

    oauthSpy = jasmine.createSpyObj('OAuthService', [
      'getIdentityClaims',
      'configure',
      'loadDiscoveryDocumentAndTryLogin',
      'setupAutomaticSilentRefresh',
      'hasValidAccessToken',
      'hasValidIdToken',
      'initCodeFlow',
      'logOut',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: OAuthService, useValue: oauthSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('configure should configure OAuth module', () => {
    oauthSpy.events = testScheduler.createColdObservable('');
    oauthSpy.hasValidAccessToken.and.returnValue(false);
    oauthSpy.hasValidIdToken.and.returnValue(false);
    oauthSpy.loadDiscoveryDocumentAndTryLogin.and.returnValue(
      jasmine.createSpyObj('Promise', ['then', 'catch'])
    );

    service.configure();

    expect(oauthSpy.configure).toHaveBeenCalledOnceWith({
      issuer: environment.OAUTH_ISSUER,
      redirectUri: environment.BASE_URL + '/auth',
      clientId: 'cm-pse-2223',
      responseType: 'code',
      scope: 'openid offline_access email groups',
      showDebugInformation: false,
    });

    expect(oauthSpy.setupAutomaticSilentRefresh).toHaveBeenCalledOnceWith();
  });

  it('configure should notify application on logout', () => {
    oauthSpy.hasValidAccessToken.and.returnValue(true);
    oauthSpy.hasValidIdToken.and.returnValue(true);
    oauthSpy.getIdentityClaims.and.returnValue(user);

    testScheduler.run(({ cold, expectObservable }) => {
      oauthSpy.events = cold('--a', { a: new OAuthInfoEvent('logout') });

      service.configure();

      expectObservable(service.loggedIn$).toBe('0-1', [user, false]);
    });
  });

  it('configure should reload user on token refresh', () => {
    oauthSpy.hasValidAccessToken.and.returnValue(true);
    oauthSpy.hasValidIdToken.and.returnValue(true);
    oauthSpy.getIdentityClaims.and.returnValue(user);

    testScheduler.run(({ cold, expectObservable }) => {
      oauthSpy.events = cold('--a', {
        a: new OAuthSuccessEvent('token_refreshed'),
      }).pipe(
        tap(() => {
          oauthSpy.getIdentityClaims.and.returnValue(otherUser);
        })
      );

      service.configure();

      expectObservable(service.loggedIn$).toBe('0-1', [user, otherUser]);
    });
  });

  it('configure should detect logged in user (stored)', () => {
    oauthSpy.events = testScheduler.createColdObservable('');
    oauthSpy.hasValidAccessToken.and.returnValue(true);
    oauthSpy.hasValidIdToken.and.returnValue(true);
    oauthSpy.getIdentityClaims.and.returnValue(user);

    testScheduler.run(({ cold, expectObservable }) => {
      cold('-(x|)').subscribe(() => service.configure());
      expectObservable(service.loggedIn$).toBe('01', [undefined, user]);
    });

    expect(oauthSpy.loadDiscoveryDocumentAndTryLogin).not.toHaveBeenCalled();
  });

  it('configure should detect logged in user (URL)', () => {
    oauthSpy.events = testScheduler.createColdObservable('');
    oauthSpy.hasValidAccessToken.and.returnValue(false);
    oauthSpy.hasValidIdToken.and.returnValue(true);

    testScheduler.run(({ cold, expectObservable }) => {
      const loggedInObs = cold('--(x|)', { x: true }).pipe(
        tap(() => {
          oauthSpy.hasValidAccessToken.and.returnValue(true);
          oauthSpy.getIdentityClaims.and.returnValue(user);
        })
      );
      oauthSpy.loadDiscoveryDocumentAndTryLogin.and.callFake(() =>
        toSimplePromise(loggedInObs)
      );

      service.configure();

      expectObservable(service.loggedIn$).toBe('0-1', [undefined, user]);
    });

    expect(
      oauthSpy.loadDiscoveryDocumentAndTryLogin
    ).toHaveBeenCalledOnceWith();
  });

  it('configure should detect logged out user', () => {
    oauthSpy.events = testScheduler.createColdObservable('');
    oauthSpy.hasValidAccessToken.and.returnValue(false);
    oauthSpy.hasValidIdToken.and.returnValue(false);

    testScheduler.run(({ cold, expectObservable }) => {
      const loggedInObs = cold('--(x|)', { x: true });
      oauthSpy.loadDiscoveryDocumentAndTryLogin.and.callFake(() =>
        toSimplePromise(loggedInObs)
      );

      service.configure();

      expectObservable(service.loggedIn$).toBe('0-1', [undefined, false]);
    });

    expect(
      oauthSpy.loadDiscoveryDocumentAndTryLogin
    ).toHaveBeenCalledOnceWith();
  });

  it('login should trigger login without path', () => {
    service.login();
    expect(oauthSpy.initCodeFlow).toHaveBeenCalledOnceWith(undefined);
  });

  it('login should trigger login with redirect path', () => {
    service.login(redirectSimple);
    expect(oauthSpy.initCodeFlow).toHaveBeenCalledOnceWith(redirectSimple);
  });

  it('logout should trigger logout', () => {
    service.logout();
    expect(oauthSpy.logOut).toHaveBeenCalledTimes(1);
  });

  it('getRedirectURL should return home if state empty', () => {
    oauthSpy.state = undefined;
    expect(service.getRedirectURL()).toBe('');
  });

  it('getRedirectURL should return home if state is auth url', () => {
    oauthSpy.state = 'auth';
    expect(service.getRedirectURL()).toBe('');
  });

  it('getRedirectURL should return state if state is simple url', () => {
    oauthSpy.state = encodeURIComponent(redirectSimple);
    expect(service.getRedirectURL()).toBe(redirectSimple);
  });

  it('getRedirectURL should return state if state is nested url', () => {
    oauthSpy.state = encodeURIComponent(redirectNested);
    expect(service.getRedirectURL()).toBe(redirectNested);
  });
});
