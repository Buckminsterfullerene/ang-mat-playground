import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDRotate } from './three-d-rotate';

describe('ThreeDRotate', () => {
  let component: ThreeDRotate;
  let fixture: ComponentFixture<ThreeDRotate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDRotate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDRotate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
