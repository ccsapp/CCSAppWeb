import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
export class ToastComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  toasts!: Toast[];

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  handleClick(toast: Toast) {
    this.toastService.removeToast(toast);
  }
}
