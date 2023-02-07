import { InjectionToken } from '@angular/core';
import { SchedulerLike } from 'rxjs';

export let SCHEDULER = new InjectionToken<SchedulerLike>('app.scheduler');
