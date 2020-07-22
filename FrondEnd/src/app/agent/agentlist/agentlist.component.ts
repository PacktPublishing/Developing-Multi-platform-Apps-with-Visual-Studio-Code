import { Component, OnInit } from '@angular/core';
import { IAgent } from 'src/app/models/agent';
import { AgentService } from 'src/app/data_service/agent.service';

@Component({
  selector: 'jos-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.css']
})
export class AgentlistComponent implements OnInit {
  agentJobList: IAgent[];
  showError: boolean = false;
  errorMessage: string;
  constructor(private service: AgentService) { }

  ngOnInit(): void {
    this.getAgentJobs();
  }

  getAgentJobs(){
    this.service.getAgentJobList().subscribe(
      res=> { this.agentJobList = res },
      error=> this.handleError(error)
    );
  }

  handleError(error){
    this.showError = true;
    this.errorMessage = error;
  }


}
