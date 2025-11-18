import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssGrid } from './css-grid';

describe('CssGrid', () => {
  let component: CssGrid;
  let fixture: ComponentFixture<CssGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
