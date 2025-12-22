import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverApiExamples } from './popover-api-examples';

describe('PopoverApiExamples', () => {
  let component: PopoverApiExamples;
  let fixture: ComponentFixture<PopoverApiExamples>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverApiExamples]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverApiExamples);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
