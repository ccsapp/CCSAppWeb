import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalDataService } from '../services/rental-data.service';
import { TitleService } from '../services/title.service';
import { LockState } from '../_models/rental-data';
import { switchMap } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-trunk-opener-view',
  templateUrl: './trunk-opener-view.component.html',
  styleUrls: ['./trunk-opener-view.component.css'],
})
export class TrunkOpenerViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private rentalData: RentalDataService,
    private titleService: TitleService,
    private toastService: ToastService
  ) {}

  loading = false;
  lockState: LockState | undefined;
  private state:
    | 'uninitialized'
    | 'error'
    | 'ill-formed'
    | 'invalid'
    | 'valid' = 'uninitialized';
  vin!: string;
  private title = 'Change Trunk Lock State';

  ngOnInit() {
    let token = this.route.snapshot.queryParams['token'];
    if (!token || !new RegExp('^[a-zA-Z0-9]{24}$').test(token)) {
      this.state = 'ill-formed';
      this.titleService.setNavbarState({ title: 'An Error Occurred.' });
      return;
    }
    this.vin = this.route.snapshot.params['vin'];
    this.rentalData.trunkAccessToken = token;
    this.rentalData.dataChanged
      .pipe(switchMap(() => this.rentalData.getTrunkLockState(this.vin)))
      .subscribe({
        next: (lockState) => {
          this.state = 'valid';
          this.lockState = lockState;
          this.titleService.setNavbarState({
            title: this.title,
          });
          this.loading = false;
        },
        error: (err) => {
          this.titleService.setNavbarState({
            title:
              err.status == HttpStatusCode.Forbidden
                ? this.title
                : 'An Error Occurred',
          });
          this.lockState = undefined;
          this.state =
            err.status == HttpStatusCode.Forbidden ? 'invalid' : 'error';
          this.loading = false;
        },
      });
  }

  toggleTrunkLockState() {
    // this.loading is only reset after the new data got retrieved from the server
    this.loading = true;
    this.rentalData
      .setTrunkLockState(
        this.vin,
        this.lockState === 'UNLOCKED' ? 'LOCKED' : 'UNLOCKED'
      )
      .subscribe({
        error: () => {
          this.toastService.addToast({
            message: 'Could not change trunk lock state.',
          });
        },
      });
  }

  get loaded() {
    return this.state != 'uninitialized';
  }

  get errorMessage() {
    switch (this.state) {
      case 'invalid':
        return 'Please provide a valid token.';
      case 'ill-formed':
        return 'The access is invalid.';
      case 'error':
        return 'Communication with the server failed.';
    }
    return;
  }
}
