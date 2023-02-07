import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, SchedulerLike, Subscription, timer } from 'rxjs';
import { SCHEDULER } from '../util';

export interface Toast {
  message: string;
  action?: () => void;
}

interface ToastWithTimer {
  timer: Subscription;
  toast: Toast;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // This subject stores the message, that is to be displayed to the user as well as the possible undo action.
  private subject$ = new BehaviorSubject<ToastWithTimer[]>([]);

  public static duration = 5000;

  constructor(@Inject(SCHEDULER) private scheduler: SchedulerLike) {}

  get toast$() {
    return this.subject$.pipe(map((arr) => arr.map(({ toast }) => toast)));
  }

  // since the toast is identified by its object identity, a new object has to be created every time a toast is added
  addToast(toast: Toast) {
    const toastWithTimer: ToastWithTimer = {
      toast: toast,
      timer: timer(ToastService.duration, this.scheduler).subscribe(() => {
        this.removeToast(toast);
      }),
    };

    this.subject$.next([...this.subject$.value, toastWithTimer]);
  }

  removeToast(toast: Toast) {
    this.subject$.value.find((t) => t.toast === toast)?.timer.unsubscribe();
    this.subject$.next(this.subject$.value.filter((t) => t.toast !== toast));
  }
}
