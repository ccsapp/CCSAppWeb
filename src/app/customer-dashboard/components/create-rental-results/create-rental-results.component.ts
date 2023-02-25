import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AvailableCar } from 'src/app/_models/rental-data';
import logoPaths from 'src/assets/brands/brands.json';

@Component({
  selector: 'app-create-rental-results',
  templateUrl: './create-rental-results.component.html',
  styleUrls: ['./create-rental-results.component.css'],
})
export class CreateRentalResultsComponent implements OnChanges {
  @Input() fullResults!: AvailableCar[];

  // the index of the first car within fullResults that is shown on the current page
  private currentIndex: number = 0;

  currentPage: {
    car: AvailableCar;
    expanded: boolean;
  }[] = [];
  hasLeft: boolean = false;
  hasRight: boolean = false;

  readonly entriesPerPage = 5;

  constructor() {}

  ngOnChanges(_changes: SimpleChanges): void {
    // this resets the pagination to the first page, also called before ngOnInit
    this.currentIndex = 0;
    this.computePage();
  }

  private computePage() {
    this.hasLeft = this.currentIndex > 0;
    this.hasRight =
      this.currentIndex + this.entriesPerPage < this.fullResults.length;
    this.currentPage = this.fullResults
      .slice(this.currentIndex, this.currentIndex + this.entriesPerPage)
      .map((car) => ({ car: car, expanded: false }));
  }

  getLogoPath(car: AvailableCar) {
    return logoPaths[car.brand];
  }

  paginate(direction: -1 | 1) {
    this.currentIndex += this.entriesPerPage * direction;
    this.computePage();
  }
}
