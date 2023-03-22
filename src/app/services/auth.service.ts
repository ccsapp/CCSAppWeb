import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/auth-data';

const authCodeFlowConfig: AuthConfig = {
  issuer: environment.OAUTH_ISSUER,
  redirectUri: environment.BASE_URL + '/auth',
  clientId: 'cm-pse-2223',
  responseType: 'code',
  scope: 'openid offline_access email groups',
  showDebugInformation: false,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject$ = new BehaviorSubject<User | undefined | false>(
    undefined
  );
  public readonly loggedIn$ = this.loggedInSubject$.asObservable();

  constructor(private oauthService: OAuthService) {}

  /**
   * Try to extract the user data from local storage and return whether this was possible
   * @returns whether valid tokens could be found in local storage proving the user is currently logged in
   */
  private tryHandleLogin() {
    if (
      !this.oauthService.hasValidAccessToken() ||
      !this.oauthService.hasValidIdToken()
    ) {
      return false;
    }

    const claims = this.oauthService.getIdentityClaims();
    const email = claims['email'];
    const groups = claims['groups'];
    this.loggedInSubject$.next(new User(email, groups));
    return true;
  }

  public configure() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.events.subscribe({
      next: (event) => {
        if (event.type === 'token_refreshed') {
          // called after login (which is handled by the Login Option 2 below) but, more importantly, on refresh as well
          this.tryHandleLogin();
        } else if (event.type === 'logout') {
          this.loggedInSubject$.next(false); // notify application that the user is no longer logged in
        }
      },
    });

    this.oauthService.setupAutomaticSilentRefresh(); // using (non-silent) refreshToken internally b/c we are in code flow

    // (Login Option 1) try to read login data from sessionStorage
    if (!this.tryHandleLogin()) {
      // login data not stored locally -> IP needed -> load the discovery document first
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        // (Login Option 2) try to extract code from URL (after redirect) and fetch token from IP
        if (!this.tryHandleLogin()) {
          // no login data in sessionStorage nor in URL -> user simply not logged in
          this.loggedInSubject$.next(false);
        }
      });
    }
  }

  /**
   * Trigger login using OAuth
   * @param redirectPath the URL the user should be redirected to after successful login with the IP
   */
  public login(redirectPath?: string) {
    // (Login Option 3) user is redirected to IP to log in, token is retreived in (Login Option 2) within configure
    //   after the user has been redirected back to this page
    this.oauthService.initCodeFlow(redirectPath);
  }

  /**
   * Trigger logout using OAuth
   */
  public logout() {
    // redirects user to IP for Single-Sign-Out, clears sessionStorage
    this.oauthService.logOut();
  }

  /**
   * Get the URL to send the user to (within this SPA)
   * @returns the redirect which was passed to login before redirect
   */
  public getRedirectURL() {
    const state = this.oauthService.state;

    if (state && state !== 'auth') {
      return decodeURIComponent(state);
    } else {
      return '';
    }
  }
}
