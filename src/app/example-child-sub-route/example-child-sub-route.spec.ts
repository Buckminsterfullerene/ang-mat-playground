import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleChildSubRoute } from './example-child-sub-route';

describe('ExampleChildSubRoute', () => {
  let component: ExampleChildSubRoute;
  let fixture: ComponentFixture<ExampleChildSubRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleChildSubRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleChildSubRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
