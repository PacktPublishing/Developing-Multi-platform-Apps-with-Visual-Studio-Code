import { Injectable } from '@angular/core';
import { IJobrequest } from '../models/jobrequest';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationService } from '../login/authorization.service';
import { Loggeduser } from '../models/loggeduser';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class JobrequestService {

  user: Loggeduser;

 /* requestList: IJobrequest[] = [
    { requestId: '100', requestedBy: 'user', requestDate: '', jobDescription: 'New Job', jobType:'Masonary', contactNo: '055548147', city:'Dubai', address: 'New addres', status:'Open' },
    { requestId: '200', requestedBy: 'user', requestDate: '', jobDescription: 'New Job 2', jobType:'Carpentry', contactNo: '055548147', city:'Dubai', address: 'New addres', status:'Open' }
  ];*/

  constructor(private authorizationService: AuthorizationService,private http: HttpClient, private config: ConfigService) { }

  saveJobRequest(request: IJobrequest) : Observable<any>{
    //HTTP Call here
    this.user = this.authorizationService.getLoggedUser();
    request.requestedBy = this.user.userid; //Update the Logged in User ID
    return this.http.post(this.config.nodeUrl + '/jobs',request, this.getOptions());
  }

  getJobRequestList(): Observable<IJobrequest[]>{
    //Get the Logged in User
    this.user = this.authorizationService.getLoggedUser();
    return this.http.get<IJobrequest[]>(this.config.nodeUrl + '/jobs');
     
  }

  getJobRequestById(requestId: string): Observable<any>{
    return this.http.get<IJobrequest>(this.config.nodeUrl + '/job?id='+requestId);
  }

  getOptions(): any{
    let opt = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return opt;
  }

}
