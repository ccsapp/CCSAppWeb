import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { FleetDataService } from 'src/app/services/fleet-data.service';
import { Car } from 'src/app/_models/fleet-data';

@Component({
  selector: 'app-fleet-overview',
  templateUrl: './fleet-overview.component.html',
  styleUrls: ['./fleet-overview.component.css'],
})
export class FleetOverviewComponent implements OnInit {
  fleetData$!: Observable<Car[]>;
  dataChanged$ = this.fleetDataService.dataChanged;

  constructor(private fleetDataService: FleetDataService) {}

  ngOnInit(): void {
    this.fleetData$ = this.dataChanged$.pipe(
      switchMap(() => this.fleetDataService.getCars())
    );
  }
}
