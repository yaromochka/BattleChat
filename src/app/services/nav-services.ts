import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavServices {
  private chatsSubject = new BehaviorSubject<Chat[]>(this.loadChats());

  get chats$(): Observable<Chat[]> {
    return this.chatsSubject.asObservable();
  }

  private loadChats(): Chat[] {
    const stored = localStorage.getItem('chats');
    return stored ? JSON.parse(stored) : [];
  }

  addChat(chat: Chat): void {
    const chats = this.loadChats();
    chats.unshift(chat);
    localStorage.setItem('chats', JSON.stringify(chats));
    this.chatsSubject.next(chats);
  }
}
