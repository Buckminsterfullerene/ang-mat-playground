import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassEffect } from './glass-effect';

describe('GlassEffect', () => {
  let component: GlassEffect;
  let fixture: ComponentFixture<GlassEffect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassEffect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassEffect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
