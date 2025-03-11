import { TestBed } from '@angular/core/testing';

import { StroageService } from './stroage.service';

describe('StroageService', () => {
  let service: StroageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StroageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
