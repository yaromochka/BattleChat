import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleChat } from './battle-chat';

describe('BattleChat', () => {
  let component: BattleChat;
  let fixture: ComponentFixture<BattleChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
