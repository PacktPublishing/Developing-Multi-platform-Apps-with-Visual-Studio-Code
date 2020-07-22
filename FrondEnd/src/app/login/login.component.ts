import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'jos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErrorMessage: boolean = false;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
    if(loginForm && loginForm.valid){
      let userName = loginForm.form.value.userName;
      let password = loginForm.form.value.password;

      if(this.authService.login(userName, password)){
        this.router.navigate([this.authService.redirectUrl]); //On Success redirect to agent or requester page
      }
      else{
        //Show error message
        this.loginErrorMessage = true;
      }
    }
  }
}
