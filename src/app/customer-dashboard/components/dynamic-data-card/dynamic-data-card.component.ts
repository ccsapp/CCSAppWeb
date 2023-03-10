import { Component, Input, OnInit } from '@angular/core';
import { RentalDataService } from 'src/app/services/rental-data.service';
import { ToastService } from 'src/app/services/toast.service';
import { capitalizeWord } from 'src/app/util';
import { Rental } from 'src/app/_models/rental-data';

@Component({
  selector: 'app-dynamic-data-card',
  templateUrl: './dynamic-data-card.component.html',
  styleUrls: ['./dynamic-data-card.component.css'],
})
export class DynamicDataCardComponent implements OnInit {
  @Input() rental!: Rental;

  locationLink: string = '';
  loading: boolean = false;

  constructor(
    private rentalData: RentalDataService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.rental.car.dynamicData) return;
    this.locationLink = `https://www.openstreetmap.org/?mlat=${this.rental.car.dynamicData.position.latitude}&mlon=${this.rental.car.dynamicData.position.longitude}`;
  }

  capitalizeWord(word: string) {
    return capitalizeWord(word);
  }

  toggleTrunkLockState() {
    this.loading = true;
    this.rentalData
      .setTrunkLockState(
        this.rental.car.vin,
        this.rental.car.dynamicData!.trunkLockState === 'LOCKED'
          ? 'UNLOCKED'
          : 'LOCKED'
      )
      .subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.toastService.addToast({
            message: "Error, couldn't change trunk lock state.",
          });
          this.loading = false;
        },
      });
  }
}
