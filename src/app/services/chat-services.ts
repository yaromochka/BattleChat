import {Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServices {
  public messagesSignal = signal<Message[]>([]);

  public messages$: Observable<Message[]> = toObservable(this.messagesSignal);

  setMessages(messages: Message[]) {
    this.messagesSignal.set(messages);
  }

  addMessage(message: Message[]) {
    this.messagesSignal.update((messages) => {
      messages.push(...message)
      return messages;
    });
  }

  getMessagesHistory(): Message[] {
  const currentMessages = this.messagesSignal();
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
