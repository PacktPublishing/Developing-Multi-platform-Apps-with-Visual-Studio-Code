import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentJobprocessComponent } from './agent-jobprocess.component';

describe('AgentJobprocessComponent', () => {
  let component: AgentJobprocessComponent;
  let fixture: ComponentFixture<AgentJobprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentJobprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentJobprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
