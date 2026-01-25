import { TestBed } from '@angular/core/testing';

import { LeftSidebarState } from './left-sidebar-state';

describe('LeftSidebarState', () => {
  let service: LeftSidebarState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeftSidebarState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
