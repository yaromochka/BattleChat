import {Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServices {
  private messagesSubject = signal<Message[]>([]);

  public messages$: Observable<Message[]> = toObservable(this.messagesSubject);

  setMessages(messages: Message[]) {
    this.messagesSubject.set(messages);
  }

  addMessage(message: Message[]) {
    this.messagesSubject.update((messages) => {
      messages.push(...message)
      return messages;
    });
  }

  getMessagesHistory(): Message[] {
  const currentMessages = this.messagesSubject();
  return currentMessages.flatMap((msg: Message) => {
    const senderType = msg.sender === 'user' ? 'user' : 'assistant';

    if (Array.isArray(msg.text)) {
      return msg.text.map((textItem: string) => ({
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
}
}
