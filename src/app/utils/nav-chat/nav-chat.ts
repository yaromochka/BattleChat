import {Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-nav-chat',
  imports: [RouterLink],
  templateUrl: './nav-chat.html',
  styleUrl: './nav-chat.scss'
})
export class NavChat {
  @Input() id!: string;
  @Input() name!: string;
}
