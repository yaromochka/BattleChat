import { Routes } from '@angular/router';
import { BattleChat } from './components/battle-chat/battle-chat';
import { ChatArena } from './components/chat-arena/chat-arena';

export const routes: Routes = [
    { path: '', component: BattleChat },
    { path: 'c/:id', component: ChatArena },
];  
