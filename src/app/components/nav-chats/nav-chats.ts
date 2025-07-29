import { Component } from '@angular/core';
import { NavChat } from "../../utils/nav-chat/nav-chat";
import { RouterLink } from '@angular/router'

type Chat = {
  id: number,
  name: string
}

@Component({
  selector: 'app-nav-chats',
  imports: [NavChat, RouterLink],
  templateUrl: './nav-chats.html',
  styleUrl: './nav-chats.scss'
})
export class NavChats {
  chats: Chat[] = [
    {
      id: 1,
      name: 'Название'
    },
    {
      id: 2,
      name: 'Средняя длина'
    },
        {
      id: 3,
      name: 'Супер очень длинное название не помещается'
    }
  ]
}
