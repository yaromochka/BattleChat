import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavChat } from './nav-chat';

describe('NavChat', () => {
  let component: NavChat;
  let fixture: ComponentFixture<NavChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
