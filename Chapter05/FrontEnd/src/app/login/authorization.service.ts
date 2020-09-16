import { Injectable } from '@angular/core';
import { Loggeduser } from '../models/loggeduser';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  user : Loggeduser;
  redirectUrl: string;

  constructor() { }

  login(userName: string, password: string): boolean {

    if ((userName == 'agent1' || userName == 'agent2' || userName == 'agent3') && password != 'agentpass') {
      return false;
    }
    else if (userName == 'user' && password != 'userpass') {
      return false;
    }
    //Successfull login set user information    
    
    if (userName == 'agent1' || userName == 'agent2' || userName == 'agent3') {
      this.user = {
        userid : userName,
        role : 'agent',
        name : 'Job Processing Agent'
      }
      localStorage.setItem('userObject', JSON.stringify(this.user));
      this.redirectUrl = '/agent';
      return true;
    }
    else if (userName == 'user') {
      this.user = {
        userid : userName,
        role : 'user',
        name : 'Job Requester'
      }      
      localStorage.setItem('userObject', JSON.stringify(this.user));
      this.redirectUrl = '/jobrequest';
      return true;
    }
  }

  isUserLoggedIn(): boolean {
    this.user = JSON.parse(localStorage.getItem('userObject'));
    if (this.user != null)
      return true;
    else
      return false;
  }
  logout(): void {
    this.user = null;
    localStorage.removeItem('userObject');
  }

  getLoggedUser(): Loggeduser {
    this.user = JSON.parse(localStorage.getItem('userObject'));
    return this.user;
  }
}
