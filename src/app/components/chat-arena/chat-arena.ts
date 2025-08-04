import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { KeyboardComponent } from "../../utils/keyboard-component/keyboard-component";
import {ActivatedRoute, Router} from '@angular/router';
import {ChatServices} from '../../services/chat-services';

@Component({
  selector: 'app-chat-arena',
  imports: [KeyboardComponent],
  templateUrl: './chat-arena.html',
  styleUrl: './chat-arena.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatArena implements OnInit {
  messages: Message[] = [];

  constructor(private chatService: ChatServices, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
      this.cdr.detectChanges();
    });
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
