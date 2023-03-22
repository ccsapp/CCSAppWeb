import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OAuthService } from 'angular-oauth2-oidc';

import { GoodbyeComponent } from './goodbye.component';

describe('GoodbyeComponent', () => {
  let component: GoodbyeComponent;
  let fixture: ComponentFixture<GoodbyeComponent>;
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
      declarations: [GoodbyeComponent],
      providers: [{ provide: OAuthService, useValue: oauthSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodbyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
