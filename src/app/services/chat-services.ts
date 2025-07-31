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

  addMessage(message: Message) {
    const current = this.messagesSubject.value;
    this.messagesSubject.next([...current, message]);
  }
}
