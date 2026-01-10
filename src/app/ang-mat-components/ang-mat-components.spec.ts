import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngMatComponents } from './ang-mat-components';

describe('AngMatComponents', () => {
  let component: AngMatComponents;
  let fixture: ComponentFixture<AngMatComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngMatComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngMatComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
