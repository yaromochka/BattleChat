import { TestBed } from '@angular/core/testing';

import { ChatServices } from './chat-services';

describe('ChatServices', () => {
  let service: ChatServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
