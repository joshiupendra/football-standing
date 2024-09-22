import { TestBed } from '@angular/core/testing';

import { FootballAPIService } from './football-api.service';

describe('FootballAPIService', () => {
  let service: FootballAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
