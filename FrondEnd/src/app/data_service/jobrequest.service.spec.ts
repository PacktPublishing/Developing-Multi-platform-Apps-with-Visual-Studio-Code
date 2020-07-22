import { TestBed } from '@angular/core/testing';

import { JobrequestService } from './jobrequest.service';

describe('JobrequestService', () => {
  let service: JobrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
