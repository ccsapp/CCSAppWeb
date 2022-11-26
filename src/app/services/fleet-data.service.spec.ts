import { TestBed } from '@angular/core/testing';

import { FleetDataService } from './fleet-data.service';

describe('FleetDataService', () => {
  let service: FleetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
