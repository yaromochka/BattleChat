import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GigachatService } from './services/gigachat-service';
import { NavChats } from "./components/nav-chats/nav-chats";

@Component({  
  selector: 'app-root',
  imports: [RouterOutlet, NavChats],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('AngularProject');

  constructor(gigachat: GigachatService) {
    gigachat.getModels()
  }
}