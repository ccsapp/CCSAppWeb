import { InjectionToken } from '@angular/core';
import { SchedulerLike } from 'rxjs';

export let SCHEDULER = new InjectionToken<SchedulerLike>('app.scheduler');

export function splitFuelCapacity(fuelCapacity: string) {
  const capcaities = fuelCapacity.split(';');

  let fuelCapacityGasoline = '';
  let fuelCapacityElectric = '';

  if (capcaities.length === 2) {
    fuelCapacityGasoline = capcaities[0].replace('L', '');
    fuelCapacityElectric = capcaities[1].replace('kWh', '');
  } else if (capcaities[0].includes('L')) {
    fuelCapacityGasoline = capcaities[0].replace('L', '');
  } else if (capcaities[0].includes('kWh')) {
    fuelCapacityElectric = capcaities[0].replace('kWh', '');
  }

  return {
    fuelCapacityGasoline,
    fuelCapacityElectric,
  };
}

export function capitalizeWord(str: string): string {
  return str
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
