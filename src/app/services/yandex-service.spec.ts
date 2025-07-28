import { TestBed } from '@angular/core/testing';

import { YandexService } from './yandex-service';

describe('YandexService', () => {
  let service: YandexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YandexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
