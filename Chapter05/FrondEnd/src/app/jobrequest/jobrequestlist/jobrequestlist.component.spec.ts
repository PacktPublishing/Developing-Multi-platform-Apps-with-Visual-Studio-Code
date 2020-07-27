import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrequestlistComponent } from './jobrequestlist.component';

describe('JobrequestlistComponent', () => {
  let component: JobrequestlistComponent;
  let fixture: ComponentFixture<JobrequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobrequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobrequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
