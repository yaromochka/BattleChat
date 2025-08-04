import {Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class NavServices {
  private chatsSignal = signal<Chat[]>(this.loadChats());
  public chats$ = toObservable(this.chatsSignal)

  private loadChats(): Chat[] {
    const stored = localStorage.getItem('chats');
    return stored ? JSON.parse(stored) : [];
  }

  addChat(chat: Chat): void {
    const chats = this.loadChats();
    chats.unshift(chat);
    localStorage.setItem('chats', JSON.stringify(chats));
    this.chatsSignal.set(chats);
  }
}
