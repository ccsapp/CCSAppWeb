import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),

    trigger('loading', [
      transition(':enter', [
        style({ width: '0%' }),
        animate(
          `${ToastService.duration}ms 100ms ease-out`,
          style({ width: '100%' })
        ),
      ]),
    ]),
  ],

  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  constructor(private toastService: ToastService) {}

  toasts!: Toast[];

  private toastSubscription?: Subscription;

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toast$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) this.toastSubscription.unsubscribe();
  }

  handleClick(toast: Toast) {
    this.toastService.removeToast(toast);
  }
}
