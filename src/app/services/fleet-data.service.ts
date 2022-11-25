import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Car, DetailedCar } from '../_models/fleet-data';

@Injectable({
  providedIn: 'root',
})
export class FleetDataService {
  private API_URL = environment.API_URL;
  private FLEET_ID = environment.FLEET_ID;

  constructor(private http: HttpClient) {}

  getCars() {
    return this.http.get<Car[]>(`${this.API_URL}/fleets/${this.FLEET_ID}/cars`);
  }

  addCar(vin: string) {
    return this.http
      .put<Car>(`${this.API_URL}/fleets/${this.FLEET_ID}/cars/${vin}/`, null)
      .subscribe();
  }

  getCarDetailed(vin: string) {
    return this.http.get<DetailedCar>(
      `${this.API_URL}/fleets/${this.FLEET_ID}/cars/${vin}`
    );
  }

  removeCar(vin: string) {
    return this.http.get<null>(
      `${this.API_URL}/fleets/${this.FLEET_ID}/cars/${vin}`
    );
  }
}
