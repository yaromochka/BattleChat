import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatArena } from './chat-arena';

describe('ChatArena', () => {
  let component: ChatArena;
  let fixture: ComponentFixture<ChatArena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatArena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatArena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
