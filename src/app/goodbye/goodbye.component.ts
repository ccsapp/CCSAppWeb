import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-goodbye',
  templateUrl: './goodbye.component.html',
  styleUrls: ['./goodbye.component.css'],
})
export class GoodbyeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setNavbarState({
      title: 'Logout',
    });
  }

  login() {
    this.authService.login();
  }
}
