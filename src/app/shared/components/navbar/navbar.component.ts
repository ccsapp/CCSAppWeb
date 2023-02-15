import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarState, TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarState$!: Observable<NavbarState>;

  constructor(private titleService: TitleService, private router: Router) {}

  ngOnInit(): void {
    this.navbarState$ = this.titleService.navbarState$;
  }

  navigateBack(path: string) {
    this.router.navigate([path]);
  }
}
