import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarGlassMenu } from './nav-bar-glass-menu';

describe('NavBarGlassMenu', () => {
  let component: NavBarGlassMenu;
  let fixture: ComponentFixture<NavBarGlassMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarGlassMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarGlassMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
