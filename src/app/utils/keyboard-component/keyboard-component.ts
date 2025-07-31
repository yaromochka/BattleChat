import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {NavServices} from '../../services/nav-services';
import {GigachatService} from '../../services/gigachat-service';
import {ChatServices} from '../../services/chat-services';

const UUID_REGEXP = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

@Component({
  selector: 'app-keyboard-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './keyboard-component.html',
  styleUrl: './keyboard-component.scss'
})
export class KeyboardComponent {
  keyboardForm: FormGroup;

  constructor(private chatService: ChatServices, private fb: FormBuilder, private router: Router, private navServices: NavServices, private gigachatService: GigachatService) {
    this.keyboardForm = this.fb.group({
      message: ['']
    });
  }

  onSubmit(): void {
    const message: string = this.keyboardForm.get('message')?.value.trim();
    if (!message) return;

    this.keyboardForm.reset();

    const userMessage: Message = {
      text: message,
      sender: 'user'
    };

    const UUID = UUID_REGEXP.test(this.router.url)
      ? this.router.url.split('/').pop()!
      : this.createNewChat(message);

    this.updateLocalChat(UUID, userMessage)

    this.gigachatService.sendMessage(message).subscribe(res => {
      const botAnswer: Message = {
        text: res.choices[0].message.content,
        sender: 'bot'
      };

      this.updateLocalChat(UUID, botAnswer);
    });
  }

  createNewChat(message: string): string {
    const UUID = crypto.randomUUID();
    const newChat: Chat = {
      id: UUID,
      name: message.slice(0, 20),
      messages: [{
        text: message,
        sender: 'user'
      }]
    };
    this.navServices.addChat(newChat)
    this.router.navigate(['/c', UUID]);
    return UUID;
  }

  private updateLocalChat(UUID: string, message: Message) {
    const chats = JSON.parse(localStorage.getItem('chats') || '[]');
    const chatIndex = chats.findIndex((c: any) => c.id === UUID);
    if (chatIndex !== -1) {
      chats[chatIndex].messages.push(message);
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }
}
