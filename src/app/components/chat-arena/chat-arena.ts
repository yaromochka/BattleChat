import {Component, OnInit} from '@angular/core';
import { KeyboardComponent } from "../../utils/keyboard-component/keyboard-component";
import {Router} from '@angular/router';
import {ChatServices} from '../../services/chat-services';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat-arena',
  imports: [KeyboardComponent, AsyncPipe],
  templateUrl: './chat-arena.html',
  styleUrl: './chat-arena.scss'
})
export class ChatArena {
  messages$: Observable<Message[]>;

  constructor(private chatService: ChatServices, private router: Router) {
    const UUID = this.router.url.split('/').pop()!;
    const chats = JSON.parse(localStorage.getItem('chats') || '[]');
    const currentChat = chats.find((c: any) => c.id === UUID);

    if (currentChat) {
      this.chatService.setMessages(currentChat.messages);
    }
    this.messages$ = this.chatService.messages$
  }
}
