import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerContainer } from './drawer-container';

describe('DrawerContainer', () => {
  let component: DrawerContainer;
  let fixture: ComponentFixture<DrawerContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
