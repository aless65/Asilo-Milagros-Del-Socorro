import { TestBed } from '@angular/core/testing';

import { ServiceServiceP } from './service.service';

describe('ServiceService', () => {
  let service: ServiceServiceP;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceServiceP);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
