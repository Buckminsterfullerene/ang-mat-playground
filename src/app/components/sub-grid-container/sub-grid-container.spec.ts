import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGridContainer } from './sub-grid-container';

describe('SubGridContainer', () => {
  let component: SubGridContainer;
  let fixture: ComponentFixture<SubGridContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubGridContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGridContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
