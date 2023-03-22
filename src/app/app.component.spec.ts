import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';

@Component({ selector: 'app-navbar', template: '' })
class NavbarStub {}

@Component({ selector: 'app-toast', template: '' })
class ToastStub {}

describe('AppComponent', () => {
  let oauthSpy: jasmine.SpyObj<OAuthService>;

  beforeEach(async () => {
    oauthSpy = jasmine.createSpyObj(
      'OAuthService',
      [
        'getIdentityClaims',
        'configure',
        'loadDiscoveryDocumentAndTryLogin',
        'hasValidAccessToken',
        'initCodeFlow',
        'logOut',
      ],
      ['events']
    );

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, NavbarStub, ToastStub],
      providers: [{ provide: OAuthService, useValue: oauthSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
