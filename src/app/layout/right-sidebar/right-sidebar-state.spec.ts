import { TestBed } from '@angular/core/testing';

import { RightSidebarState } from './right-sidebar-state';

describe('RightSidebarState', () => {
  let service: RightSidebarState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightSidebarState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
