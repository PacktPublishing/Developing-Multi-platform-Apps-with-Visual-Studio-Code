import { TestBed } from '@angular/core/testing';

import { JobrequestGuard } from './jobrequest.guard';

describe('JobrequestGuard', () => {
  let guard: JobrequestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JobrequestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
