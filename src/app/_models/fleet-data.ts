export interface Car {
  vin: string;
  brand: string;
  model: string;
  productionDate: Date;
}

export interface DetailedCar extends Car {
  technicalSpecification: TechnicalSpecification;
  dynamicData: DynamicData;
  rental?: Rental;
}

interface Rental {
  id: string;
  active: boolean;
  customer: Customer;
  rentalPeriod: TimePeriod;
}

interface Customer {
  customerId: string;
}

interface TimePeriod {
  startDate: Date;
  endDate: Date;
}

interface TechnicalSpecification {
  color: string;
  weight: number;
  trunkVolume: number;
  engine: Engine;
  transmission: 'AUTOMATIC' | 'MANUAL';
  tire: Tire;
  numberOfSeats: number;
  numberOfDoors: number;
  fuel: 'DIESEL' | 'PETROL' | 'HYBRID_DIESEL' | 'HYBRID_PETROL' | 'ELECTRIC';
  fuelCapacity: string;
  consumption: Evaluation;
  emissions: Evaluation;
}

interface DynamicData {
  fuelLevelPercentage: number;
  position: Position;
  trunkLockState: 'LOCKED' | 'UNLOCKED';
  doorsLockState: 'LOCKED' | 'UNLOCKED';
  engineState: 'ON' | 'OFF';
}

interface Position {
  latitude: number;
  longitude: number;
}

interface Engine {
  type: string;
  power: number;
}

interface Tire {
  manufacturer: string;
  type: string;
}

interface Evaluation {
  city: number;
  overland: number;
  combined: number;
}
