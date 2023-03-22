import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AvailableCar,
  Car,
  LockState,
  Rental,
  TimePeriod,
  TrunkAccess,
} from '../_models/rental-data';

@Injectable({
  providedIn: 'root',
})
export class RentalDataService {
  private API_URL = environment.RENTALM_API_URL;
  private dataChanged$ = new BehaviorSubject(null);
  public customerId?: string;
  public trunkAccessToken?: string;

  constructor(private http: HttpClient) {}

  /**
   * This BehaviorSubject is used to notify the components that the data has changed.
   * Whenever the next method is called on this subject, all subscribers will be notified.
   *
   * Data can change when a new rental is created, a trunk access permission is granted
   * or the trunk lock state of a car is updated.
   */
  get dataChanged(): BehaviorSubject<null> {
    return this.dataChanged$;
  }

  getAvailableCars(period: TimePeriod): Observable<AvailableCar[]> {
    return this.http.get<AvailableCar[]>(`${this.API_URL}/cars`, {
      params: {
        startDate: period.startDate.toJSON(),
        endDate: period.endDate.toJSON(),
      },
    });
  }

  /**
   *
   * @param vin the vin of the car to retrieve details for
   * @returns single element observable with car, does not contain dynamic data
   */
  getCar(vin: string): Observable<Car> {
    return this.http.get<Car>(`${this.API_URL}/cars/${vin}`);
  }

  createRental(
    vin: string,
    rentalPeriod: TimePeriod
  ): Observable<HttpResponse<null>> {
    return this.http
      .post<null>(`${this.API_URL}/cars/${vin}/rentals`, rentalPeriod, {
        observe: 'response',
        params: {
          customerId: this.customerId!,
        },
      })
      .pipe(tap(() => this.dataChanged$.next(null)));
  }

  /**
   * Depends on trunk access token being set
   * @param vin
   * @returns
   */
  getTrunkLockState(vin: string): Observable<LockState> {
    return this.http
      .get<{ trunkLockState: LockState }>(`${this.API_URL}/cars/${vin}/trunk`, {
        params: {
          trunkAccessToken: this.trunkAccessToken!,
        },
      })
      .pipe(map((obj) => obj.trunkLockState));
  }

  /**
   * Uses trunk access token if present, customer id otherwise
   * @param vin
   * @param lockState
   * @returns
   */
  setTrunkLockState(
    vin: string,
    lockState: LockState
  ): Observable<HttpResponse<null>> {
    const authParam: { [param: string]: string } = this.trunkAccessToken
      ? {
          trunkAccessToken: this.trunkAccessToken,
        }
      : {
          customerId: this.customerId!,
        };

    return this.http
      .put<null>(
        `${this.API_URL}/cars/${vin}/trunk`,
        { trunkLockState: lockState },
        {
          observe: 'response',
          params: {
            ...authParam,
          },
        }
      )
      .pipe(
        tap(() => this.dataChanged$.next(null)),
        // trigger a data update regardless if the request was successful because the permission
        // might have expired
        catchError((err) => {
          this.dataChanged$.next(null);
          throw err;
        })
      );
  }

  /**
   *
   * @returns does not contain trunk access tokens nor cars' technicalSpecifications and dynamic data
   */
  getOverview(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.API_URL}/rentals`, {
      params: { customerId: this.customerId! },
    });
  }

  /**
   *
   * @param rentalId
   * @returns may contain trunk access token and dynamic data, always contains technicalSpecification
   */
  getRentalStatus(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`${this.API_URL}/rentals/${rentalId}`);
  }

  grantTrunkAccess(
    rentalId: string,
    validityPeriod: TimePeriod
  ): Observable<TrunkAccess> {
    return this.http
      .post<TrunkAccess>(
        `${this.API_URL}/rentals/${rentalId}/trunkTokens`,
        validityPeriod
      )
      .pipe(tap(() => this.dataChanged$.next(null)));
  }
}
