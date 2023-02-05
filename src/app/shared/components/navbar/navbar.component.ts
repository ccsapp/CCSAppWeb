import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title$!: Observable<string>;
  backButtonPath$!: Observable<string | null>;
  titleIconPath$!: Observable<string | null>;

  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.title$ = this.titleService.title$;
    this.backButtonPath$ = this.titleService.backButtonPath$;
    this.titleIconPath$ = this.titleService.titleIcon$;
  }
}
