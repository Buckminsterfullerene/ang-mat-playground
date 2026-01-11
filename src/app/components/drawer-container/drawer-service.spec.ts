import { TestBed } from '@angular/core/testing';

import { Drawer } from './drawer';

describe('DrawerService', () => {
  let service: Drawer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Drawer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
