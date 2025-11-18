import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempExample } from './temp-example';

describe('TempExample', () => {
  let component: TempExample;
  let fixture: ComponentFixture<TempExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
