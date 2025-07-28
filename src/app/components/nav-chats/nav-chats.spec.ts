import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavChats } from './nav-chats';

describe('NavChats', () => {
  let component: NavChats;
  let fixture: ComponentFixture<NavChats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavChats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavChats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
