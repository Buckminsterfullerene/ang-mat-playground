import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gradients } from './gradients';

describe('Gradients', () => {
  let component: Gradients;
  let fixture: ComponentFixture<Gradients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gradients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gradients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
