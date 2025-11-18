import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavItems } from './header-nav-items';

describe('HeaderNavItems', () => {
  let component: HeaderNavItems;
  let fixture: ComponentFixture<HeaderNavItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNavItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNavItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
