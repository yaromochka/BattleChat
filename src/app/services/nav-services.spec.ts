import { TestBed } from '@angular/core/testing';

import { NavServices } from './nav-services';

describe('NavServices', () => {
  let service: NavServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
