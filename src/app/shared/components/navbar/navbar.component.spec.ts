import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
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
      declarations: [NavbarComponent],
      providers: [{ provide: OAuthService, useValue: oauthSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
