import {Component, OnInit} from '@angular/core';
import { NavChat } from "../../utils/nav-chat/nav-chat";
import {RouterLink} from '@angular/router'
import {NavServices} from '../../services/nav-services';

@Component({
  selector: 'app-nav-chats',
  imports: [NavChat, RouterLink],
  templateUrl: './nav-chats.html',
  styleUrl: './nav-chats.scss'
})
export class NavChats implements OnInit {
  chats: Chat[] = [];

  constructor(public navServices: NavServices) {}

  ngOnInit(): void {
    this.navServices.chats$.subscribe(chats => {
      this.chats = chats;
    })
  }

  onSubmit() {
    localStorage.clear();
  }
}
