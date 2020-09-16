import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentlistComponent } from './agentlist.component';

describe('AgentlistComponent', () => {
  let component: AgentlistComponent;
  let fixture: ComponentFixture<AgentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
