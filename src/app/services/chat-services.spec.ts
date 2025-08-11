import { TestBed } from '@angular/core/testing';

import { ChatServices } from './chat-services';

describe('ChatServices', () => {
  let service: ChatServices;

  let testMessage: Message[] = [{
    text: 'Hello World',
    sender: "user"
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a signal', () => {
    expect(service.messagesSignal).toBeTruthy();
  })

  it('should create a observable messages', () => {
    expect(service.messages$).toBeTruthy();
  })

  it('should set messages', () => {
    service.setMessages(testMessage)
    expect(service.messagesSignal).toBe(
      {
        text: 'Hello World',
        sender: 'user'
      }
    );
  })
});
