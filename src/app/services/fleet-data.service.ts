import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Car, DetailedCar } from '../_models/fleet-data';

@Injectable({
  providedIn: 'root',
})
export class FleetDataService {
  private API_URL = environment.API_URL;
  private FLEET_ID = environment.FLEET_ID;
  private dataChanged$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  /**
   * This BehaviorSubject is used to notify the components that the data has changed.
   * Whenever the next method is called on this subject, all subscribers will be notified.
   */
  get dataChanged(): BehaviorSubject<null> {
    return this.dataChanged$;
  }

  getCars() {
    return this.http.get<Car[]>(`${this.API_URL}/fleets/${this.FLEET_ID}/cars`);
  }

  addCar(vin: string) {
    return this.http
      .put<null>(`${this.API_URL}/fleets/${this.FLEET_ID}/cars/${vin}`, null, {
        observe: 'response',
      })
      .pipe(tap(() => this.dataChanged$.next(null)));
  }

  getCarDetailed(vin: string) {
    return this.http.get<DetailedCar>(
      `${this.API_URL}/fleets/${this.FLEET_ID}/cars/${vin}`
    );
  }

  removeCar(vin: string) {
    return (
      this.http
        .delete<null>(`${this.API_URL}/fleets/${this.FLEET_ID}/cars/${vin}`, {
          observe: 'response',
        })
        // trigger a data update regardless if the request was successful
        .pipe(
          tap(() => this.dataChanged$.next(null)),
          catchError((err) => {
            this.dataChanged$.next(null);
            throw err;
          })
        )
    );
  }
}
