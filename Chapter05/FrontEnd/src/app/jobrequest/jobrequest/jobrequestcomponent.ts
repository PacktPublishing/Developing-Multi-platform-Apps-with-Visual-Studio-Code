import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IJobrequest } from 'src/app/models/jobrequest';
import { JobrequestService } from 'src/app/data_service/jobrequest.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'jos-jobrequest',
  templateUrl: './jobrequest.component.html',
  styleUrls: ['./jobrequest.component.css']
})
export class JobrequestComponent implements OnInit {

  jobRequest = {} as IJobrequest;
  showError: boolean = false;
  errorMessage: string;
  showSuccess: boolean = false;
  successMessage: string;


  constructor(private service: JobrequestService)
  {} 
  

  ngOnInit(): void {
    

  }

  handleSuccess(res) {
    debugger;
    this.showSuccess = true;
    this.successMessage = 'Job Created Successfully';
  }
  handleError(error) {
    this.showError = true;
    this.errorMessage = error;
  }
  onSubmit(form: NgForm) {
    this.service.saveJobRequest(this.jobRequest).subscribe(
      res => this.handleSuccess(res),
      error => this.handleError(error)
    );
  }

  

}
