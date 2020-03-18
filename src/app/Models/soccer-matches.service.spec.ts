import { TestBed } from '@angular/core/testing';

import { SoccerMatchesService } from '../Services/soccer-matches.service';

describe('SoccerMatchesService', () => {
  let service: SoccerMatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoccerMatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
