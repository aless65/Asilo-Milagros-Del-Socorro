import { TestBed } from '@angular/core/testing';

import { ServiceServiceE } from './service.service';

describe('ServiceService', () => {
  let service: ServiceServiceE;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceServiceE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
