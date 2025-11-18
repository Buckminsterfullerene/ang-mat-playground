import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamExample } from './stream-example';

describe('StreamExample', () => {
  let component: StreamExample;
  let fixture: ComponentFixture<StreamExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
