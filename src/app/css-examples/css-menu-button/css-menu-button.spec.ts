import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssMenuButton } from './css-menu-button';

describe('CssMenuButton', () => {
  let component: CssMenuButton;
  let fixture: ComponentFixture<CssMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssMenuButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssMenuButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
