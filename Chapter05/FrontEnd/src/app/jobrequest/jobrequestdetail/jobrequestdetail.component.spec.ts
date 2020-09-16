import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrequestdetailComponent } from './jobrequestdetail.component';

describe('JobrequestdetailComponent', () => {
  let component: JobrequestdetailComponent;
  let fixture: ComponentFixture<JobrequestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobrequestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobrequestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
