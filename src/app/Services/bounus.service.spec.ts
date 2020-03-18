import { TestBed } from '@angular/core/testing';

import { BounusService } from './bounus.service';

describe('BounusService', () => {
  let service: BounusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BounusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
