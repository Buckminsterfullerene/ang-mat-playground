import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDSlider } from './three-d-slider';

describe('ThreeDSlider', () => {
  let component: ThreeDSlider;
  let fixture: ComponentFixture<ThreeDSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeDSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
