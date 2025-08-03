import {Component, OnInit} from '@angular/core';
import { KeyboardComponent } from "../../utils/keyboard-component/keyboard-component";
import {ActivatedRoute, Router} from '@angular/router';
import {ChatServices} from '../../services/chat-services';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat-arena',
  imports: [KeyboardComponent, AsyncPipe],
  templateUrl: './chat-arena.html',
  styleUrl: './chat-arena.scss'
})
export class ChatArena implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private chatService: ChatServices, private router: Router, private route: ActivatedRoute) {
    this.messages$ = this.chatService.messages$
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.loadData(); 
    });
  }

  loadData() {
    const UUID = this.router.url.split('/').pop()!;
    const chats = JSON.parse(localStorage.getItem('chats') || '[]');
    const currentChat = chats.find((c: Chat) => c.id === UUID);

    if (currentChat) {
      this.chatService.setMessages(currentChat.messages);
    }
  }
}
