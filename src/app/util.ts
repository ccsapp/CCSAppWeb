import { InjectionToken } from '@angular/core';
import { SchedulerLike } from 'rxjs';

export let SCHEDULER = new InjectionToken<SchedulerLike>('app.scheduler');

export function capitalizeWord(str: string): string {
  return str
    .split('_')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
