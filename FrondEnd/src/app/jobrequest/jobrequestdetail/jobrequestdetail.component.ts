import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobrequestService } from 'src/app/data_service/jobrequest.service';
import { IJobrequest } from 'src/app/models/jobrequest';

@Component({
  selector: 'jos-jobrequestdetail',
  templateUrl: './jobrequestdetail.component.html',
  styleUrls: ['./jobrequestdetail.component.css']
})
export class JobrequestdetailComponent implements OnInit {

  jobRequest = {} as IJobrequest;
  showError: boolean = false;
  errorMessage: string;

  constructor(private service: JobrequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const requestId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getJobById(requestId);
  }

  handleError(error) {
    this.showError = true;
    this.errorMessage = error;
  }

  getJobById(jobId: string) {
    this.service.getJobRequestById(jobId).subscribe(
      res => { this.jobRequest = res; debugger; },
      error => {
        return this.handleError(error);
      }
    )
  }
  back() {
    window.history.back();
  }
}
