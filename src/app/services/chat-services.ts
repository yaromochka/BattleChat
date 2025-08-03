import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServices {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  setMessages(messages: Message[]) {
    this.messagesSubject.next(messages);
  }

  addMessage(message: Message[]) {
    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, ...message]);
  }

  getMessagesHistory(): Message[] {
  const currentMessages = this.messagesSubject.value;
  
const history = currentMessages.flatMap(msg => {
  const senderType = msg.sender === 'user' ? 'user' : 'assistant';
  
  if (Array.isArray(msg.text)) {
    return msg.text.map(textItem => ({
      text: textItem,
      sender: senderType
    }));
  } else {
    return [{
      text: msg.text,
      sender: senderType
    }];
  }
});

  return history;
}
}
