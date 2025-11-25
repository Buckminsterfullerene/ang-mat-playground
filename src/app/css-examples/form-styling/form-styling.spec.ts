import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStyling } from './form-styling';

describe('FormStyling', () => {
  let component: FormStyling;
  let fixture: ComponentFixture<FormStyling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStyling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStyling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
