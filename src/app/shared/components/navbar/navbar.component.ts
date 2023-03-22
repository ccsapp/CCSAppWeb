import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarState, TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarState$!: Observable<NavbarState>;

  loggedIn$!: Observable<boolean>;

  constructor(
    private titleService: TitleService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navbarState$ = this.titleService.navbarState$;
    this.loggedIn$ = this.authService.loggedIn$.pipe(map((user) => !!user));
  }

  navigateBack(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
  }
}
