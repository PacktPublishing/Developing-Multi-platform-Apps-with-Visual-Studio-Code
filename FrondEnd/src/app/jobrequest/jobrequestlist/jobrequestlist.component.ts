import { Component, OnInit } from '@angular/core';
import { IJobrequest } from 'src/app/models/jobrequest';
import { JobrequestService } from 'src/app/data_service/jobrequest.service';

@Component({
  selector: 'jos-jobrequestlist',
  templateUrl: './jobrequestlist.component.html',
  styleUrls: ['./jobrequestlist.component.css']
})
export class JobrequestlistComponent implements OnInit {

  requestList: IJobrequest[];
  showError: boolean = false;
  errorMessage: string;
  constructor(private service: JobrequestService) { }

  ngOnInit(): void {
    this.getJobList();
  }

  getJobList(){
    this.service.getJobRequestList().subscribe(
      res=> { this.requestList = res; debugger; },
      error=> this.handleError(error)
    );
  }

  handleError(error){
    this.showError = true;
    this.errorMessage = error;
  }
}
