import { TestBed } from '@angular/core/testing';

import { EductionService } from './eduction.service';

describe('EductionService', () => {
  let service: EductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
