import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Rental, TrunkAccess } from 'src/app/_models/rental-data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trunk-access-card',
  templateUrl: './trunk-access-card.component.html',
  styleUrls: ['./trunk-access-card.component.css'],
})
export class TrunkAccessCardComponent {
  @Input() rental: Rental | undefined;
  @Output() updateTrunkAccess: EventEmitter<TrunkAccess> = new EventEmitter();
  isReplace: boolean = false;

  constructor(private toastService: ToastService) {}

  activateReplace() {
    this.isReplace = true;
  }

  get token() {
    return `${environment.BASE_URL}/trunkAccess/${this.rental?.car.vin}?token=${this.rental?.token?.token}`;
  }

  copyToken() {
    const promise = navigator.clipboard.writeText(this.token);
    promise.then(
      () => {
        this.toastService.addToast({ message: 'Token copied to clipboard.' });
      },
      () => {
        this.toastService.addToast({
          message: 'Error, copying token to clipboard.',
        });
      }
    );
  }

  updateTrunkAccessEvent(token: TrunkAccess | undefined) {
    this.isReplace = false;
    if (token) {
      this.updateTrunkAccess.emit(token);
    }
  }
}
