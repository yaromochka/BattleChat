import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NavChat } from "../../utils/nav-chat/nav-chat";
import {Router, RouterLink} from '@angular/router'
import {NavServices} from '../../services/nav-services';

@Component({
  selector: 'app-nav-chats',
  imports: [NavChat, RouterLink],
  templateUrl: './nav-chats.html',
  styleUrl: './nav-chats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavChats implements OnInit {
  chats: Chat[] = [];

  constructor(private router: Router, private navServices: NavServices, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.navServices.chats$.subscribe(chats => {
      this.chats = chats;
      this.cdr.detectChanges();
    })
  }

  onSubmit() {
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
