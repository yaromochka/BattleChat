import { TestBed } from '@angular/core/testing';

import { GigachatService } from './gigachat-service';

describe('Gigachat', () => {
  let service: GigachatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigachatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
