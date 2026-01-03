import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssHas } from './css-has';

describe('CssHas', () => {
  let component: CssHas;
  let fixture: ComponentFixture<CssHas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssHas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssHas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
