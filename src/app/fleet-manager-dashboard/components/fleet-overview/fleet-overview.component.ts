import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { TitleService } from 'src/app/services/title.service';
import { OverviewCar } from 'src/app/_models/fleet-data';

@Component({
  selector: 'app-fleet-overview',
  templateUrl: './fleet-overview.component.html',
  styleUrls: ['./fleet-overview.component.css'],
})
export class FleetOverviewComponent implements OnInit {
  fleetData$!: Observable<OverviewCar[]>;
  dataChanged$ = this.fleetDataService.dataChanged;

  constructor(
    private fleetDataService: FleetDataService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.fleetData$ = this.dataChanged$.pipe(
      switchMap(() => this.fleetDataService.getCars())
    );
    this.titleService.setNavbarState({ title: 'Your Fleet' });
  }
}
