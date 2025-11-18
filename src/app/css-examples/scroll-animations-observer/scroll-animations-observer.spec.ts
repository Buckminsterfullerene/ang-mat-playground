import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollAnimationsObserver } from './scroll-animations-observer';

describe('ScrollAnimationsObserver', () => {
  let component: ScrollAnimationsObserver;
  let fixture: ComponentFixture<ScrollAnimationsObserver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollAnimationsObserver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollAnimationsObserver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
