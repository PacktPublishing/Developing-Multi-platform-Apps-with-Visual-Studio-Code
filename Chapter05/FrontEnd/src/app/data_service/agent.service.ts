import { Injectable } from '@angular/core';
import { IJobrequest } from '../models/jobrequest';
import { AuthorizationService } from '../login/authorization.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Loggeduser } from '../models/loggeduser';
import { IAgent } from '../models/agent';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  user: Loggeduser;

  constructor(private authorizationService: AuthorizationService, private http: HttpClient, private config: ConfigService) { }

  saveAgentAction(request: IAgent) : Observable<any>{
    return this.http.post(this.config.javaUrl + '/jobs',request, this.getOptions());
  }

  getAgentJobList(): Observable<IAgent[]> {
    //Get the Logged in User
    this.user = this.authorizationService.getLoggedUser();
    //this.http.get<Jobrequest[]>('url', request);
    return this.http.get<IAgent[]>(this.config.javaUrl + '/jobByAgentUser?agentUser='+this.user.userid);
  }

  getAgentJobById(requestId: string): Observable<any>{
    let jobRequest : IAgent;
    return this.http.get<IAgent>(this.config.javaUrl + '/jobById?id='+requestId);
  }
  getOptions(): any{
    let opt = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return opt;
  }
}
