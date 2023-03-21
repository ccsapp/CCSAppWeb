import { DynamicData, TechnicalSpecification } from './fleet-data';

export interface AvailableCar {
  vin: string;
  brand: string;
  model: string;
  numberOfSeats: number;
}

export interface Car {
  vin: string;
  brand: string;
  model: string;
  technicalSpecification?: Omit<TechnicalSpecification, 'tire'>;
  dynamicData?: DynamicData;
}

export interface TimePeriod {
  startDate: Date;
  endDate: Date;
}

interface Customer {
  customerId: string;
}

export interface TrunkAccess {
  token: string;
  validityPeriod: TimePeriod;
}

export interface Rental {
  id: string;
  state: 'ACTIVE' | 'EXPIRED' | 'UPCOMING';
  rentalPeriod: TimePeriod;
  car: Car;
  token?: TrunkAccess;
}

export type LockState = 'LOCKED' | 'UNLOCKED';
