import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/data_service/agent.service';
import { IAgent } from 'src/app/models/agent';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'jos-agent-jobprocess',
  templateUrl: './agent-jobprocess.component.html',
  styleUrls: ['./agent-jobprocess.component.css']
})
export class AgentJobprocessComponent implements OnInit {

  agentJob = {} as IAgent;
  showError: boolean = false;
  errorMessage: string;
  showSuccess: boolean = false;
  successMessage: string;

  constructor(private service:AgentService, private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
    const requestId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAgentJobById(requestId);
  }

  handleError(error) {
    this.showError = true;
    this.errorMessage = error;
  }
  handleSuccess(res) {
    this.showSuccess = true;
    this.successMessage = 'Job Saved Successfully';
  }
  processAgentJob(form: NgForm) {
    this.service.saveAgentAction(this.agentJob).subscribe(
      res => this.handleSuccess(res),
      error => this.handleError(error)
    );
  }
  getAgentJobById(jobId: string) {
    this.service.getAgentJobById(jobId).subscribe(
      res => { this.agentJob = res; },
      error => {
        return this.handleError(error);
      }
    )
  }

  back() {
    window.history.back();
  }

}
